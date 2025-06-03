import { sendMail } from "../../utils/sendEmail.js";

const myAccountDeletedEmail = async ({ fullname, email }) => {
    const subject = `🗑️ Jasmine Automate`;

    const htmlBody = `
        <div style="max-width: 700px; margin: auto; border: 1px solid #ddd; border-radius: 8px; font-family: 'Segoe UI', Tahoma, sans-serif; background-color: #fff; color: #333;">
            <div style="background-color: #d9534f; color: #fff; padding: 20px 30px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">Jasmine Automate</h2>
            <p style="margin: 4px 0 0;">🗑️ Account Deletion Confirmation</p>
            </div>

            <div style="padding: 30px;">
            <p style="font-size: 16px;">Dear <strong>${fullname}</strong>,</p>

            <p style="font-size: 15px;">
                This email confirms that your account has been <strong>successfully deleted</strong> from 
                <strong>Jasmine Automate</strong> as per your request.
            </p>

            <p style="margin-top: 15px;">
                If you did not initiate this deletion or believe it was done in error, please contact our support team as soon as possible.
            </p>

            <p style="margin-top: 15px;">
                We sincerely appreciate the time you spent with us. You're always welcome to rejoin the platform in the future.
            </p>

            <p style="margin-top: 30px; font-size: 14px;">Wishing you the very best in all your endeavors.</p>

            <p style="margin-top: 30px; font-size: 14px;">Warm regards,</p>
            <p style="font-weight: 600; font-size: 15px;">Jasmine Automate<br/>Support Team</p>
            </div>

            <div style="background-color: #f9f9f9; text-align: center; padding: 15px; font-size: 12px; color: #999; border-top: 1px solid #ddd; border-radius: 0 0 8px 8px;">
            <p style="margin: 0;">© ${new Date().getFullYear()} Jasmine Automate. All rights reserved.</p>
            </div>
        </div>
    `;

    await sendMail(email, subject, htmlBody);
};

export default myAccountDeletedEmail;
