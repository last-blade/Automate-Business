import mongoose from "mongoose";
import meetingNoteCreatedEmail from "../../emails/meetingNoteEmails/meetingNoteCreatedEmail.js";
import { apiError, apiResponse, asyncHandler, MeetingNote, User } from "../allImports.js";

const createMeetingNote = asyncHandler(async (request, response) => {
    const {meetingTitle, meetingDate, department, meetingMode, meetingMembers, meetingDescription} = request.body;
console.log(meetingMembers)
    if(!Array.isArray(meetingMembers)){
        throw new apiError(400, "Meeting members should be in an array")
    }

    if(!meetingTitle){
        throw new apiError(400, "Meeting title is required")
    }

    if(!meetingDate){
        throw new apiError(400, "Meeting date is required")
    }

    if(!meetingDescription){
        throw new apiError(400, "Meeting description is required")
    }

    const formattedMembers = meetingMembers.map((m, index) => {
        if (m.companyMember) {
        if (!mongoose.Types.ObjectId.isValid(m.companyMember)) {
            throw new apiError(400, `Invalid companyMember at index ${index}`);
        }
        return { companyMember: m.companyMember };
        }

        if (m.outsideMember && typeof m.outsideMember === "string") {
        return { outsideMember: m.outsideMember.trim() };
        }

        throw new apiError(
        400,
        `Each meeting member must have companyMember or outsideMember at index ${index}`
        );
    });

    const meetingNote = await MeetingNote.create({
        meetingTitle,
        meetingDate,
        department,
        meetingMode,
        meetingMembers: formattedMembers,
        meetingDescription,
        meetingNoteCreatedBy: request.user?.id,
    });

    for (const member of meetingMembers) {

    // COMPANY MEMBER
    if (member.companyMember) {

        const user = await User.findById(member.companyMember)
            .select("fullname email");

        if (user?.email) {
            await meetingNoteCreatedEmail({
                receiverName: user.fullname,
                receiverEmail: user.email,
                meetingTitle,
                meetingDate,
                department,
                meetingMode,
                meetingDescription,
                createdByName: request.user.fullname
            });
        }
    }

    // OUTSIDE MEMBER (ONLY IF EMAIL PROVIDED)
    if (member.outsideMember && member.outsideMember.includes("@")) {
        await meetingNoteCreatedEmail({
            receiverName: member.outsideMember,
            receiverEmail: member.outsideMember,
            meetingTitle,
            meetingDate,
            department,
            meetingMode,
            meetingDescription,
            createdByName: request.user.fullname
        });
    }
}


    return response.status(201)
    .json(
        new apiResponse(201, {}, "Meeting note created")
    )

});

export {createMeetingNote};