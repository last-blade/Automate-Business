import { asyncHandler, User, apiResponse, apiError } from "../allImports.js";

const fetchTeamMemberDetails = asyncHandler(async (request, response) => {
    const { userId } = request.params;

    if (!userId) {
        throw new apiError(400, "User ID is required");
    }

    const foundUser = await User.findById(userId).select("-password -__v -refreshToken -_id");

    if (!foundUser) {
        throw new apiError(404, "User not found");
    }

    return response.status(200).json(
        new apiResponse(200, foundUser, "User details fetched successfully")
    );
});

export { fetchTeamMemberDetails };
