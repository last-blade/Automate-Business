import { apiError, apiResponse, asyncHandler, MeetingNote } from "../allImports.js";

const editMeetingNote = asyncHandler(async (request, response) => {
    const { meetingNoteId } = request.params;

    const {
        meetingTitle,
        meetingDate,
        department,
        meetingMode,
        meetingMembers,
        meetingDescription
    } = request.body;

    if (!meetingNoteId) {
        throw new apiError(400, "Meeting note id is required");
    }

    if(!Array.isArray(meetingMembers)){
        throw new apiError(400, "Meeting members should be in an array")
    }

    const existingMeetingNote = await MeetingNote.findById(meetingNoteId).populate("meetingMembers.companyMember", "fullname email");

    if (!existingMeetingNote) {
        throw new apiError(404, "Meeting note not found");
    }

    if (meetingTitle !== undefined) existingMeetingNote.meetingTitle = meetingTitle;
    if (meetingDate !== undefined) existingMeetingNote.meetingDate = meetingDate;
    if (department !== undefined) existingMeetingNote.department = department;
    if (meetingMode !== undefined) existingMeetingNote.meetingMode = meetingMode;
    if (meetingMembers !== undefined) existingMeetingNote.meetingMembers = meetingMembers;
    if (meetingDescription !== undefined) existingMeetingNote.meetingDescription = meetingDescription;

    await existingMeetingNote.save();

    return response.status(200).json(
        new apiResponse(200, existingMeetingNote, "Meeting note updated successfully")
    );
});

export { editMeetingNote };
