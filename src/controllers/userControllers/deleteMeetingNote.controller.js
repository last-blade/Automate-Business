import { apiError, apiResponse, asyncHandler, MeetingNote } from "../allImports.js";

const deleteMeetingNote = asyncHandler(async (request, response) => {
    const { meetingNoteId } = request.params;

    if (!meetingNoteId) {
        throw new apiError(400, "Meeting note id is required");
    }

    const deletedMeetingNote = await MeetingNote.findByIdAndDelete(meetingNoteId);

    if (!deletedMeetingNote) {
        throw new apiError(404, "Meeting note not found");
    }

    return response.status(200).json(
        new apiResponse(200, {}, "Meeting note deleted successfully")
    );
});

export { deleteMeetingNote };
