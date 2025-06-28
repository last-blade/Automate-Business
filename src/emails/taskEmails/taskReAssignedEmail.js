import { sendMail } from "../../utils/sendEmail.js";

const taskReAssignedEmail = async ({ newAssigneeName, newAssigneeEmail, oldUserEmail, totalTasksReassigned }) => {
    const subject = `📂 ${totalTasksReassigned} Task(s) Reassigned to You`;

    const htmlBody = `
        <div style="max-width: 700px; margin: auto; border: 1px solid #ddd; border-radius: 8px; font-family: 'Segoe UI', Tahoma, sans-serif; background-color: #fff; color: #333;">
            <div style="background-color: #1976D2; color: #fff; padding: 20px 30px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">Jasmine Automate</h2>
            <p style="margin: 4px 0 0;">🔄 Task Reassignment Notification</p>
            </div>

            <div style="padding: 30px;">
            <p style="font-size: 16px;">Dear <strong>${newAssigneeName}</strong>,</p>
            <p style="font-size: 15px;">
                This is to inform you that <strong>${totalTasksReassigned}</strong> task(s) previously assigned to 
                <span style="color: #d32f2f;"><strong>${oldUserEmail}</strong></span> 
                have now been reassigned to you within <strong>Jasmine Automate</strong>.
            </p>

            <p style="margin-top: 15px;">Please log in to your dashboard to review and take action on these tasks.</p>

            <div style="margin-top: 25px; text-align: center;">
                <a href="https://jasmineautomate.vercel.app/" 
                style="background-color: #1976D2; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600;">
                🔗 Go to Dashboard
                </a>
            </div>

            <p style="margin-top: 30px; font-size: 14px;">If you have any questions, feel free to contact your project manager or supervisor.</p>

            <p style="margin-top: 30px; font-size: 14px;">Best regards,</p>
            <p style="font-weight: 600; font-size: 15px;">Jasmine Automate<br/>Task Management Team</p>
            </div>

            <div style="background-color: #f9f9f9; text-align: center; padding: 15px; font-size: 12px; color: #999; border-top: 1px solid #ddd; border-radius: 0 0 8px 8px;">
            <p style="margin: 0;">© ${new Date().getFullYear()} Jasmine Automate. All rights reserved.</p>
            </div>
        </div>
    `;

    await sendMail(newAssigneeEmail, subject, htmlBody);
};

export default taskReAssignedEmail;
