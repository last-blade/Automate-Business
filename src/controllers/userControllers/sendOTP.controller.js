import { apiError, apiResponse, asyncHandler, User } from "../allImports.js";
import { sendOtpToEmail } from "../../utils/sendOtpToEmail.js";
import { sendWhatsAppTemplate } from "../../utils/sendWhatsApp.js";

const sendOTP = asyncHandler(async (request, response) => {
    const { email } = request.body;

    if(!email){
        throw new apiError(404, "Email is required for OTP")
    }

    const otp = await sendOtpToEmail(email, "Your OTP for verification on Jasmine Automate");

    const foundUser = await User.findOne({email});

    if(!foundUser){
        throw new apiError(404, "User not found with this email")
    }

    const phone = foundUser.whatsappNumber;

    await sendWhatsAppTemplate({
        to: phone,
        messages: [otp],
        templateName: "otp_auth_code",
        languageCode: "en_US",
        
    });

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 5 * 60 * 1000,
    };

    return response.status(200)
        .cookie("Email", email, options)
        .json(new apiResponse(200, {}, "OTP sent successfully."));
});

export {sendOTP}