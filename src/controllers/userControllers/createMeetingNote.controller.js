import { apiError, apiResponse, asyncHandler, MeetingNote } from "../allImports.js";

const createMeetingNote = asyncHandler(async (request, response) => {
    const {meetingTitle, meetingDate, department, meetingMode, meetingMembers, meetingDescription} = request.body;

    if(!meetingTitle){
        throw new apiError(400, "Meeting title is required")
    }

    if(!meetingDate){
        throw new apiError(400, "Meeting date is required")
    }

    if(!meetingDescription){
        throw new apiError(400, "Meeting description is required")
    }

    const meetingNote = await MeetingNote.create({
        meetingTitle,
        meetingDate,
        department,
        meetingMode,
        meetingMembers,
        meetingDescription,
        meetingNoteCreatedBy: request.user?.id,
    });

    return response.status(201)
    .json(
        new apiResponse(201, {}, "Meeting note created")
    )

});

export {createMeetingNote};