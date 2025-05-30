import { sendMail } from "../../utils/sendEmail.js";

const taskReAssignedEmail = async ({ newAssigneeName, newAssigneeEmail, oldUserEmail, totalTasksReassigned }) => {
    const subject = `📂 ${totalTasksReassigned} Task(s) Reassigned to You`;

    const htmlBody = `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h2 style="color: #1976D2;">🔄 Task Reassignment Notification</h2>
        <p>Dear <strong>${newAssigneeName}</strong>,</p>

        <p>This is to inform you that <strong>${totalTasksReassigned}</strong> task(s) previously assigned to 
        <strong>${oldUserEmail}</strong> have now been reassigned to you under 
        <strong>KPS Automate Business Solutions</strong>.</p>

        <p>Please login to your dashboard to review the tasks.</p>

        <p>If you have any questions, feel free to reach out to your project manager or supervisor.</p>

        <p>Best regards,<br><strong>KPS Automate Business Solutions</strong> Team</p>
    </div>
    `;

    await sendMail(newAssigneeEmail, subject, htmlBody);
};

export default taskReAssignedEmail;
