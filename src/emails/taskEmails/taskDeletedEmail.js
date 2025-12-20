import { sendMail } from "../../utils/sendEmail.js";
import { sendWhatsAppTemplate } from "../../utils/sendWhatsApp.js";

const taskDeletedEmail = async ({ taskTitle, assigneeName, assigneeEmail, phone }) => {
    const subject = `❌ Task Deleted - ${taskTitle}`;

    const htmlBody = `
        <div style="max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #fff; color: #333;">
            <div style="background-color: #D32F2F; color: #fff; padding: 20px 30px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0; font-weight: 600;">Jasmine Automate</h2>
            <p style="margin: 5px 0 0;">Task Deleted Notification</p>
            </div>

            <div style="padding: 30px;">
            <p style="font-size: 16px;">Hi <strong>${assigneeName}</strong>,</p>
            <p style="font-size: 15px;">We would like to inform you that the following task has been removed from your task list:</p>

            <table style="width: 100%; margin-top: 20px; border-collapse: collapse; font-size: 14px;">
                <tr>
                <td style="padding: 12px; border: 1px solid #ddd; background-color: #fef2f2;"><strong>Task Title</strong></td>
                <td style="padding: 12px; border: 1px solid #ddd;">${taskTitle}</td>
                </tr>
            </table>

            <p style="margin-top: 30px; font-size: 14px;">If this action was unexpected or you have any concerns, please contact your team lead or administrator immediately.</p>

            <p style="margin-top: 40px; font-size: 14px;">Best regards,</p>
            <p style="font-weight: 600; font-size: 15px;">Jasmine Automate<br/>Productivity & Workflow Team</p>
            </div>

            <div style="background-color: #f8f8f8; color: #888; text-align: center; padding: 15px; border-top: 1px solid #ddd; border-radius: 0 0 8px 8px; font-size: 12px;">
            <p style="margin: 0;">© ${new Date().getFullYear()} Jasmine Automate. All rights reserved.</p>
            </div>
        </div>
    `;

    await sendMail(assigneeEmail, subject, htmlBody);
    await sendWhatsAppTemplate({
      to: phone,
        messages: [
        assigneeName,
        taskTitle,
      ],
      templateName: "task_deleted",
      languageCode: "en",
    //   buttonParams: [taskId],
    
      // ❌ NO buttonParams at all
    });
};

export default taskDeletedEmail;