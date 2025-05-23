import { apiError, apiResponse, asyncHandler, User } from "../allImports.js";

const logoutUser = asyncHandler(async (request, response) => {

    const user = request?.user;

    const userId = user?._id;

    const foundUser = await User.findById(userId);

    if(!foundUser){
        throw new apiError(401, "Unauthorized access, please login again")
    }

    await User.findByIdAndUpdate(userId, {
        $unset: {
            refreshToken: ""
        }
    }, {new: true});

    return response.status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(
        new apiResponse(200, {}, "Logged out successfully")
    )
});

export { logoutUser }