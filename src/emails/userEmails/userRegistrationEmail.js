import { sendMail } from "../../utils/sendEmail.js";

const userRegistrationEmail = async ({ fullname, email }) => {
    const subject = `🎉 Welcome to KPS Automate Business Solutions!`;

    const htmlBody = `
    <div style="max-width: 700px; margin: auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; border: 1px solid #ddd; border-radius: 8px; background-color: #fff;">
        <div style="background-color: #4CAF50; color: #fff; padding: 20px 30px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">Registration Successful!</h2>
        </div>
        <div style="padding: 30px; font-size: 16px; line-height: 1.5;">
            <p>Hi <strong>${fullname}</strong>,</p>

            <p>Welcome to <strong>KPS Automate Business Solutions</strong>! 🎉 Your account has been successfully registered.</p>

            <table style="border-collapse: collapse; margin: 20px 0; width: 100%;">
                <tr>
                    <td style="padding: 8px; border: 1px solid #ccc; width: 150px;"><strong>Email</strong></td>
                    <td style="padding: 8px; border: 1px solid #ccc;">${email}</td>
                </tr>
            </table>

            <p>You can now log in to your account and start exploring the platform.</p>
            <p>If you have any questions, feel free to reach out to our support team.</p>

            <p>Best regards,<br/>
            <strong>KPS Automate Business Solutions</strong> Team</p>
        </div>
        <div style="background-color: #f9f9f9; color: #999; font-size: 12px; text-align: center; padding: 15px; border-top: 1px solid #ddd; border-radius: 0 0 8px 8px;">
            <p style="margin: 0;">© ${new Date().getFullYear()} KPS Automate Business Solutions. All rights reserved.</p>
        </div>
    </div>
    `;

    await sendMail(email, subject, htmlBody);
};

export default userRegistrationEmail;