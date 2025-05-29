import { sendMail } from "../../utils/sendEmail.js";

const changeTaskStatusEmail = async ({ taskTitle, assigneeName, assigneeEmail, newStatus }) => {
    const subject = `✅ Task Status Updated - ${taskTitle}`;

    const htmlBody = `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <h2 style="color: #4CAF50;">🔄 Task Status Changed</h2>
            <p>Hi <strong>${assigneeName}</strong>,</p>
            <p>The status of your task in <strong>KPS Automate Business Solutions</strong> has been updated.</p>

            <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
                <tr>
                    <td style="padding: 8px; border: 1px solid #ccc;"><strong>Task</strong></td>
                    <td style="padding: 8px; border: 1px solid #ccc;">${taskTitle}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ccc;"><strong>New Status</strong></td>
                    <td style="padding: 8px; border: 1px solid #ccc;">${newStatus}</td>
                </tr>
            </table>

            <p>Visit your KPS Automate dashboard to see more details.</p>

            <p>Best regards,<br/>The <strong>KPS Automate Business Solutions</strong> Team</p>
        </div>
    `;

    await sendMail(assigneeEmail, subject, htmlBody);
};

export default changeTaskStatusEmail;