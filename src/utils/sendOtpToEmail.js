import { sendMail } from "./sendEmail.js";
import { OTP } from "../models/otp.model.js";

const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000);
};

const sendOtpToEmail = async (email, subject) => {
    const existingOTP = await OTP.findOne({ email });

    if (existingOTP) {
        throw new Error("Please wait before requesting a new OTP.");
    }

    const generatedOTP = generateOTP();

    const emailBody = `
    <p>Dear User,</p>
    <p>Your One-Time Password (OTP) for verification is: <strong>${generatedOTP}</strong></p>
    <p>Please enter this OTP to complete your process. Do not share this code with anyone for security reasons.</p>
    <p>This OTP is valid for a limited time. If you did not request this, please ignore this email.</p>
    <p>Best regards,<br><strong>Team KPS Automate Business Solutions</strong></p>
    `;

    await sendMail(email, subject, emailBody);

    await OTP.findOneAndUpdate(
        { email },
        { $push: { otp: generatedOTP }, createdAt: new Date() },
        { new: true, upsert: true }  
    );

    return generatedOTP;
};

export { sendOtpToEmail };
