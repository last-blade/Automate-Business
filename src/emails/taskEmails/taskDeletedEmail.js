import { sendMail } from "../../utils/sendEmail.js";

const taskDeletedEmail = async ({ taskTitle, assigneeName, assigneeEmail }) => {
    const subject = `❌ Task Deleted - ${taskTitle}`;

    const htmlBody = `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <h2 style="color: #e53935;">❌ Task Deleted</h2>
            <p>Hi <strong>${assigneeName}</strong>,</p>
            <p>We want to inform you that the task titled <strong>${taskTitle}</strong> has been deleted from your task list on <strong>KPS Automate Business Solutions</strong>.</p>

            <p>If you believe this was a mistake or have any questions, please contact your team lead or administrator.</p>

            <p>Regards,<br/>The <strong>KPS Automate Business Solutions</strong> Team</p>
        </div>
    `;

    await sendMail(assigneeEmail, subject, htmlBody);
};

export default taskDeletedEmail;