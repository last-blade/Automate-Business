import mongoose from "mongoose";
import { apiResponse, asyncHandler, MeetingNote } from "../allImports.js";

const fetchMeetingNotes = asyncHandler(async (request, response) => {

    const limit = parseInt(request.query.limit) || 10;
    const page = parseInt(request.query.page) || 1;
    const skip = (page - 1) * 10;

    const meetingNotes = await MeetingNote.aggregate([
  {
    $match: {
      meetingNoteCreatedBy: new mongoose.Types.ObjectId(request.user.id)
    }
  },

  // Normalize meetingMembers into array
  {
    $addFields: {
      normalizedMeetingMembers: {
        $cond: [
          { $isArray: "$meetingMembers" },
          "$meetingMembers",
          {
            $cond: [
              { $eq: [{ $type: "$meetingMembers" }, "string"] },
              {
                $map: {
                  input: {
                    $split: ["$meetingMembers", ","]
                  },
                  as: "name",
                  in: {
                    outsideMember: { $trim: { input: "$$name" } }
                  }
                }
              },
              []
            ]
          }
        ]
      }
    }
  },

  // Lookup only company members
  {
    $lookup: {
      from: "users",
      localField: "normalizedMeetingMembers.companyMember",
      foreignField: "_id",
      as: "companyMembers"
    }
  },

  // Filter outside members
  {
    $addFields: {
      outsideMembers: {
        $filter: {
          input: "$normalizedMeetingMembers",
          as: "m",
          cond: { $ne: ["$$m.outsideMember", null] }
        }
      }
    }
  },

  {
    $project: {
      meetingTitle: 1,
      meetingDate: 1,
      department: 1,
      meetingMode: 1,
      meetingDescription: 1,
      createdAt: 1,

      meetingMembers: {
        $concatArrays: [
          {
            $map: {
              input: "$companyMembers",
              as: "c",
              in: {
                fullname: "$$c.fullname",
                email: "$$c.email",
                accountType: "$$c.accountType",
                whatsappNumber: "$$c.whatsappNumber"
              }
            }
          },
          {
            $map: {
              input: "$outsideMembers",
              as: "o",
              in: {
                fullname: "$$o.outsideMember",
                email: null,
                accountType: "Outside",
                whatsappNumber: null
              }
            }
          }
        ]
      }
    }
  },

  { $sort: { createdAt: -1 } },
  { $skip: skip },
  { $limit: limit }
]);



    if(meetingNotes.length === 0){
        return response.status(200)
        .json(
            new apiResponse(200, {}, "No meeting note found, create one.")
        )
    }

    const totalNotes = meetingNotes.length;

    return response.status(200)
    .json(
        new apiResponse(200, {page, totalPages: Math.ceil(totalNotes/limit), meetingNotes, totalNotes}, "Meetings notes fetched successfully")
    )

});

export {fetchMeetingNotes}