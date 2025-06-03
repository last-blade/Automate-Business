import { sendMail } from "../../utils/sendEmail.js";

const accountDeletedEmail = async ({ fullname, email }) => {
    const subject = `❌ Your Account Has Been Deleted - Jasmine Automate`;

    const htmlBody = `
        <div style="max-width: 700px; margin: auto; border: 1px solid #ddd; border-radius: 8px; font-family: 'Segoe UI', Tahoma, sans-serif; background-color: #fff; color: #333;">
            <div style="background-color: #e74c3c; color: #fff; padding: 20px 30px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">Jasmine Automate</h2>
            <p style="margin: 4px 0 0;">❌ Account Deletion Notice</p>
            </div>

            <div style="padding: 30px;">
            <p style="font-size: 16px;">Dear <strong>${fullname}</strong>,</p>

            <p style="font-size: 15px;">
                We regret to inform you that your account has been <strong>deleted</strong> by the administrator of 
                <strong>Jasmine Automate</strong>.
            </p>

            <p style="margin-top: 15px;">
                As part of this action, all your associated tasks and data have been permanently removed from our system.
            </p>

            <p style="margin-top: 15px;">
                If you believe this was an error or you have any questions, please reach out to your reporting manager or system administrator.
            </p>

            <p style="margin-top: 30px; font-size: 14px;">Thank you for your contributions.</p>

            <p style="margin-top: 30px; font-size: 14px;">Warm regards,</p>
            <p style="font-weight: 600; font-size: 15px;">Jasmine Automates<br/>Account Management Team</p>
            </div>

            <div style="background-color: #f9f9f9; text-align: center; padding: 15px; font-size: 12px; color: #999; border-top: 1px solid #ddd; border-radius: 0 0 8px 8px;">
            <p style="margin: 0;">© ${new Date().getFullYear()} Jasmine Automate. All rights reserved.</p>
            </div>
        </div>
    `;

    await sendMail(email, subject, htmlBody);
};

export default accountDeletedEmail;