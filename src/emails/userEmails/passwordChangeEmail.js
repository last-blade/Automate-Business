import { sendMail } from "../../utils/sendEmail.js";

const passwordChangeEmail = async ({ fullname, email }) => {
    const subject = `🔐 Your KPS Account Password Has Been Updated`;

    const htmlBody = `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <h2 style="color: #4CAF50;">Password Changed Successfully</h2>
            <p>Hi <strong>${fullname}</strong>,</p>

            <p>This is to confirm that your password for <strong>KPS Automate Business Solutions</strong> has been changed successfully.</p>

            <p>If you made this change, no further action is needed.</p>
            <p>If you did <strong>not</strong> authorize this change, please <strong>change your password right away</strong> to secure your account.</p>

            <p>Stay secure,<br/>
            <strong>KPS Automate Business Solutions</strong> Team</p>
        </div>
    `;

    await sendMail(email, subject, htmlBody);
};

export default passwordChangeEmail;