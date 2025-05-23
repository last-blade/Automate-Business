import { accessTokenOptions, apiError, apiResponse, asyncHandler, generateAccessToken, generateRefreshToken, refreshTokenOptions, User } from "../allImports.js";
import jwt from "jsonwebtoken"

const refreshAccessToken = asyncHandler(async (request, response) => {
    
    const {refreshToken} = request?.cookies;

    let decodedRefreshToken;

    try {
        decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
        throw new apiError(401, "Invalid or expired refresh token");
    }

    if(!decodedRefreshToken){
        throw new apiError(401, "Session timeout, please login again")
    }

    const userId = decodedRefreshToken.id;

    const foundUser = await User.findById(userId);

    if(!foundUser){
        throw new apiError(401, "Refresh Token expired, login again")
    }

    if(foundUser.refreshToken !== refreshToken){
        throw new apiError(401, "Refresh token not recognized");
    }

    const newAccessToken = await generateAccessToken(userId);    
    const newRefreshToken = await generateRefreshToken(userId);
    
    foundUser.refreshToken = newRefreshToken;

    foundUser.save({validateBeforeSave: false});

    return response.status(200)
    .cookie("accessToken", newAccessToken, accessTokenOptions)
    .cookie("refreshToken", newRefreshToken, refreshTokenOptions)
    .json(
        new apiResponse(200, {}, "Access Token Refreshed")
    )
});

export { refreshAccessToken }