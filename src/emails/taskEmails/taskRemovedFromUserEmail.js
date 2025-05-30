import { sendMail } from "../../utils/sendEmail.js";

const taskRemovedFromUserEmail = async ({ oldUserName, oldUserEmail, newUserName, totalTasksRemoved }) => {
    const subject = `🚫 ${totalTasksRemoved} Task(s) Removed From Your Account`;

    const htmlBody = `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h2 style="color: #D32F2F;">⚠️ Task Reassignment Alert</h2>
        <p>Dear <strong>${oldUserName}</strong>,</p>

        <p>This is to inform you that <strong>${totalTasksRemoved}</strong> task(s) previously assigned to you have been 
        reassigned to <strong>${newUserName}</strong> as part of a workflow update by 
        <strong>KPS Automate Business Solutions</strong>.</p>

        <p>If this change was unexpected or requires clarification, please contact your team supervisor.</p>

        <p>Thank you for your contribution.</p>

        <p>Best regards,<br><strong>KPS Automate Business Solutions</strong> Team</p>
    </div>
    `;

    await sendMail(oldUserEmail, subject, htmlBody);
};

export default taskRemovedFromUserEmail;