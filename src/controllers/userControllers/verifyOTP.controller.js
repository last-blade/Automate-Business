import { verifyOtpHelper } from "../../utils/verifyOtpHelper.js";
import { apiError, apiResponse, asyncHandler } from "../allImports.js";

const verifyOTP = asyncHandler(async (request, response) => {
    const {incomingOTP} = request.body;
    const email = request.cookies?.Email;

    if(!incomingOTP){
        throw new apiError(404, "OTP not found!")
    }

    if(!email){
        throw new apiError(404, "Email not found!")
    }

    if(!incomingOTP){
        throw new apiError(400, "OTP is required.")
    }
    
    const isOtpValid = await verifyOtpHelper(email, incomingOTP);

    if(isOtpValid){
        return response.status(200)
        .json(
            new apiResponse(200, {}, "OTP Verified.")
        )
    }
    
});

export {verifyOTP}