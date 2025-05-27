import { apiResponse, asyncHandler, NewMember } from "../allImports.js";

const fetchAllTeamMembers = asyncHandler(async (request, response) => {
    const loggedInUser = request.user?.id;

    const teamMembersList = await NewMember.find({
        newMemberCreatedBy: loggedInUser
        })
        .populate({
        path: 'newMember',
        match: { accountType: { $in: ['Admin', 'Manager', 'Team Member'] } },
        select: '-password -__v -reportingManager -createdAt -updatedAt'
    }).select("-newMemberCreatedBy -_id -__v -password");

    const filteredList = teamMembersList.filter(item => item.newMember !== null);

    return response.status(200)
    .json(
        new apiResponse(200, filteredList, "All team members fetched successfully")
    )

});

export {fetchAllTeamMembers}