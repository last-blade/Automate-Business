import mongoose from "mongoose";
import { apiError, apiResponse, asyncHandler, MeetingNote } from "../allImports.js";

const viewMeetingNote = asyncHandler(async (request, response) => {
    const {meetingNoteId} = request?.params;

    if(!mongoose.isValidObjectId(meetingNoteId)){
        throw new apiError(400, "Meeting note id is invalid")
    }

    const foundMeetingNote = await MeetingNote.findById(meetingNoteId).populate("meetingMembers.companyMember", "fullname email")

    return response.status(200)
    .json(
        new apiResponse(200, foundMeetingNote, "Meeting note fetch succesfully")
    )

});

export {viewMeetingNote}