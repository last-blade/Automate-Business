import { sendMail } from "../../utils/sendEmail.js";

const commentNotificationEmail = async ({ recipientName, recipientEmail, commenterName, taskTitle, commentText }) => {
    const subject = `💬 New Comment on Task: "${taskTitle}"`;

    const htmlBody = `
    <div style="max-width: 700px; margin: auto; font-family: 'Segoe UI', Tahoma, sans-serif; color: #333; border: 1px solid #ddd; border-radius: 8px; background-color: #fff;">
        <div style="background-color: #1976D2; color: #fff; padding: 20px 30px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">Jasmine Automate</h2>
            <p style="margin: 4px 0 0;">💬 Task Comment Notification</p>
        </div>

        <div style="padding: 30px;">
            <p style="font-size: 16px;">Hi <strong>${recipientName}</strong>,</p>

            <p style="font-size: 15px;">
                <strong>${commenterName}</strong> has commented on the task: <strong>${taskTitle}</strong>
            </p>

            <blockquote style="border-left: 4px solid #ccc; margin: 20px 0; padding-left: 15px; font-style: italic; color: #555;">
                ${commentText}
            </blockquote>

            <p>You can reply or view more details by visiting your dashboard.</p>

            <div style="text-align: center; margin: 30px 0;">
                <a href="https://jasmineautomate.vercel.app/" style="background-color: #1976D2; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 4px; font-size: 15px;">
                    🔗 Go to Dashboard
                </a>
            </div>

            <p style="font-size: 14px;">Warm regards,<br />
            <strong>Jasmine Automate</strong> Team</p>
        </div>

        <div style="background-color: #f9f9f9; text-align: center; padding: 15px; font-size: 12px; color: #999; border-top: 1px solid #ddd; border-radius: 0 0 8px 8px;">
            <p style="margin: 0;">© ${new Date().getFullYear()} Jasmine Automate. All rights reserved.</p>
        </div>
    </div>
    `;

    await sendMail(recipientEmail, subject, htmlBody);
};

export default commentNotificationEmail;