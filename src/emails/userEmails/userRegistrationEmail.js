import { sendMail } from "../../utils/sendEmail.js";

const userRegistrationEmail = async ({ fullname, email }) => {
    const subject = `🎉 Welcome to KPS Automate Business Solutions!`;

    const htmlBody = `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <h2 style="color: #4CAF50;">Registration Successful!</h2>
            <p>Hi <strong>${fullname}</strong>,</p>

            <p>Welcome to <strong>KPS Automate Business Solutions</strong>! 🎉</p>
            <p>Your account has been successfully registered.</p>

            <table style="border-collapse: collapse; margin: 20px 0;">
                <tr>
                    <td style="padding: 8px; border: 1px solid #ccc;"><strong>Email</strong></td>
                    <td style="padding: 8px; border: 1px solid #ccc;">${email}</td>
                </tr>
            </table>

            <p>You can now log in to your account and start exploring the platform.</p>
            <p>For any assistance, feel free to contact us.</p>

            <p>Cheers,<br/>
            <strong>KPS Automate Business Solutions</strong> Team</p>
        </div>
    `;

    await sendMail(email, subject, htmlBody);
};

export default userRegistrationEmail;