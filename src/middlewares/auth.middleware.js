import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const authMiddleware = asyncHandler(async (request, _, next) => {

    const {accessToken} = request?.cookies;

    if(!accessToken){
        throw new apiError(401, "Unauthorized access!")
    }

    const decodedToken = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    if(!decodedToken){
        throw new apiError(401, "Unauthorized access!")
    }

    const userId = decodedToken?.id;

    const foundUser = await User.findById(userId).select("-password -refreshToken -__v");

    if(!foundUser){
        throw new apiError(401, "Unauthorized access, please login again")
    }

    request.user = foundUser;

    return next();    

});

export {authMiddleware}