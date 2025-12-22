import { sendMail } from "../../utils/sendEmail.js";
import { sendWhatsAppTemplate } from "../../utils/sendWhatsApp.js";

const overdueTasksNotificationEmail = async ({ fullname, email, totalOverdueTasks, phone }) => {
    const subject = `⏰ ${totalOverdueTasks} Task(s) Marked as Overdue`;

    const htmlBody = `
    <div style="max-width: 700px; margin: auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; border: 1px solid #ddd; border-radius: 8px; background-color: #fff;">
        <div style="background-color: #FF5722; color: #fff; padding: 20px 30px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">Task Overdue Update</h2>
        </div>
        <div style="padding: 30px; font-size: 16px; line-height: 1.5;">
            <p>Hi <strong>${fullname}</strong>,</p>

            <p>This is a system-generated notification to inform you that <strong>${totalOverdueTasks}</strong> task(s) have been automatically marked as <strong>Overdue</strong> as of today.</p>

            <p>Please log in to your dashboard and review these tasks to take appropriate actions.</p>

            <div style="margin-top: 25px; text-align: center;">
                <a href="https://jasmineautomate.vercel.app/" 
                style="background-color: #FF5722; color: #fff; text-decoration: none; padding: 12px 20px; border-radius: 6px; display: inline-block; font-weight: bold;">
                Go to Dashboard
                </a>
            </div>

            <p>If you have questions or believe this is an error, kindly reach out to your project supervisor.</p>

            <p>Stay on track,<br/>
            <strong>Jasmine Automate</strong> Team</p>
        </div>
        <div style="background-color: #f9f9f9; color: #999; font-size: 12px; text-align: center; padding: 15px; border-top: 1px solid #ddd; border-radius: 0 0 8px 8px;">
            <p style="margin: 0;">© ${new Date().getFullYear()} Jasmine Automate. All rights reserved.</p>
        </div>
    </div>
    `;

    await sendMail(email, subject, htmlBody);

    await sendWhatsAppTemplate({
        to: phone,
        messages: [
        fullname || "User",
        totalOverdueTasks,
        ],
        templateName: "overdue_tasks_notification",
        languageCode: "en",
    });
};

export default overdueTasksNotificationEmail;