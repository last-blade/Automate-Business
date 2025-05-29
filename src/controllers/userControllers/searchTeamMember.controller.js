import mongoose from "mongoose";
import { apiError, apiResponse, asyncHandler, NewMember, User } from "../allImports.js";

const searchTeamMember = asyncHandler(async (request, response) => {
    const loggedInUserId = request.user?.id;

    const { fullname } = request.query;

    if (!fullname || fullname.trim() === "") {
        throw new apiError(400, "Please provide a name to search");
    }

    const nameRegex = new RegExp(fullname.trim(), "i");

    const matchedUsers = await User.find({ fullname: nameRegex }).select("_id");

    const matchedUserIds = matchedUsers.map((user) => {
        return user._id
    });

    const allTeamMembers = await NewMember.find({
        newMemberCreatedBy: loggedInUserId,
        newMember: { $in: matchedUserIds }
    }).populate("newMember", "fullname email accountType");

    return response.status(200)
    .json(
        new apiResponse(200, allTeamMembers, `Found ${allTeamMembers.length} team members`)
    );
});

export { searchTeamMember };
