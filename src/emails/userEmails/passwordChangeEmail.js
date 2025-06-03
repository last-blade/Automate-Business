import { sendMail } from "../../utils/sendEmail.js";

const passwordChangeEmail = async ({ fullname, email }) => {
    const subject = `🔐 Your Jasmine Automate Account Password Has Been Updated`;

    const htmlBody = `
        <div style="max-width: 700px; margin: auto; border: 1px solid #ddd; border-radius: 8px; font-family: 'Segoe UI', Tahoma, sans-serif; background-color: #fff; color: #333;">
            <div style="background-color: #4CAF50; color: #fff; padding: 20px 30px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">Jasmine Automate</h2>
            <p style="margin: 4px 0 0;">🔐 Password Change Confirmation</p>
            </div>

            <div style="padding: 30px;">
            <p style="font-size: 16px;">Hello <strong>${fullname}</strong>,</p>

            <p style="font-size: 15px;">
                This is a confirmation that the password for your <strong>Jasmine Automate</strong> account has been successfully updated.
            </p>

            <p style="margin-top: 15px;">
                If you performed this action, you can safely disregard this message.
            </p>

            <p style="margin-top: 15px; color: #d32f2f;">
                If you did <strong>not</strong> make this change, please <a href="#" style="color: #d32f2f; text-decoration: underline;">reset your password</a> immediately to secure your account.
            </p>

            <p style="margin-top: 30px;">Stay safe,<br/>
            <strong>Jasmine Automate</strong> Team</p>
            </div>

            <div style="background-color: #f9f9f9; text-align: center; padding: 15px; font-size: 12px; color: #999; border-top: 1px solid #ddd; border-radius: 0 0 8px 8px;">
            <p style="margin: 0;">© ${new Date().getFullYear()} Jasmine Automate. All rights reserved.</p>
            </div>
        </div>
    `;

    await sendMail(email, subject, htmlBody);
};

export default passwordChangeEmail;