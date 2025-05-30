import { apiError, apiResponse, asyncHandler } from "../allImports.js";
import { sendOtpToEmail } from "../../utils/sendOtpToEmail.js";

const sendOTP = asyncHandler(async (request, response) => {
    const { email } = request.body;

    if(!email){
        throw new apiError(404, "Email is required for OTP")
    }

    await sendOtpToEmail(email, "Your OTP for verification on KPS Automate Business Solutions");

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 2 * 60 * 1000,
    };

    return response.status(200)
        .cookie("Email", email, options)
        .json(new apiResponse(200, {}, "OTP sent successfully."));
});

export {sendOTP}