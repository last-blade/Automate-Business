import { sendMail } from "../../utils/sendEmail.js";

const taskCreatedEmail = async ({ taskTitle, assigneeName, assigneeEmail, dueDate }) => {
    const subject = "📝 New Task Assigned - KPS Automate Business Solutions";

    const htmlBody = `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <h2 style="color: #4CAF50;">📌 New Task Assigned</h2>
            <p>Hi <strong>${assigneeName}</strong>,</p>
            <p>You have been assigned a new task via <strong>KPS Automate Business Solutions</strong>.</p>

            <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
                <tr>
                    <td style="padding: 8px; border: 1px solid #ccc;"><strong>Task</strong></td>
                    <td style="padding: 8px; border: 1px solid #ccc;">${taskTitle}</td>
                </tr>
                ${dueDate ? `
                <tr>
                    <td style="padding: 8px; border: 1px solid #ccc;"><strong>Due Date</strong></td>
                    <td style="padding: 8px; border: 1px solid #ccc;">${dueDate}</td>
                </tr>
                ` : ''}
            </table>

            <p>Please log in to your KPS Automate dashboard to view and manage this task.</p>

            <p>Thanks,<br/>The <strong>KPS Automate Business Solutions</strong> Team</p>
        </div>
    `;

    await sendMail(assigneeEmail, subject, htmlBody);
};

export default taskCreatedEmail;
