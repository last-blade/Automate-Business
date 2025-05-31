import { sendMail } from "../../utils/sendEmail.js";

const taskRemovedFromUserEmail = async ({ oldUserName, oldUserEmail, newUserName, totalTasksRemoved }) => {
    const subject = `🚫 ${totalTasksRemoved} Task(s) Removed From Your Account`;

    const htmlBody = `
        <div style="max-width: 700px; margin: auto; border: 1px solid #ddd; border-radius: 8px; font-family: 'Segoe UI', Tahoma, sans-serif; background-color: #fff; color: #333;">
            <div style="background-color: #D32F2F; color: #fff; padding: 20px 30px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">KPS Automate Business Solutions</h2>
            <p style="margin: 4px 0 0;">⚠️ Task Reassignment Alert</p>
            </div>

            <div style="padding: 30px;">
            <p style="font-size: 16px;">Dear <strong>${oldUserName}</strong>,</p>

            <p style="font-size: 15px;">
                This is to inform you that <strong>${totalTasksRemoved}</strong> task(s) previously assigned to you have been 
                reassigned to <strong>${newUserName}</strong> as part of a workflow update in 
                <strong>KPS Automate Business Solutions</strong>.
            </p>

            <p style="margin-top: 15px;">If this change was unexpected or you have any questions, please contact your team supervisor for more information.</p>

            <p style="margin-top: 30px; font-size: 14px;">Thank you for your contributions and continued support.</p>

            <p style="margin-top: 30px; font-size: 14px;">Best regards,</p>
            <p style="font-weight: 600; font-size: 15px;">KPS Automate Business Solutions<br/>Task Management Team</p>
            </div>

            <div style="background-color: #f9f9f9; text-align: center; padding: 15px; font-size: 12px; color: #999; border-top: 1px solid #ddd; border-radius: 0 0 8px 8px;">
            <p style="margin: 0;">© ${new Date().getFullYear()} KPS Automate Business Solutions. All rights reserved.</p>
            </div>
        </div>
    `;

    await sendMail(oldUserEmail, subject, htmlBody);
};

export default taskRemovedFromUserEmail;