import { sendMail } from "../../utils/sendEmail.js";

const changeTaskStatusEmail = async ({ taskTitle, assigneeName, assigneeEmail, newStatus }) => {
    const subject = `✅ Task Status Updated - ${taskTitle}`;

    const htmlBody = `
        <div style="max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; background-color: #f9f9f9;">
        <div style="background-color: #0047AB; color: #fff; padding: 20px 30px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0; font-weight: 600;">Jasmine Automate</h2>
            <p style="margin: 5px 0 0;">Task Status Updated</p>
        </div>

        <div style="padding: 30px;">
            <p style="font-size: 16px;">Hi <strong>${assigneeName}</strong>,</p>
            <p style="font-size: 15px;">We wanted to let you know that the status of your assigned task has recently changed. Here are the updated details:</p>

            <table style="width: 100%; margin-top: 25px; border-collapse: collapse; font-size: 14px;">
            <tr>
                <td style="padding: 12px; border: 1px solid #ddd; background-color: #f1f5fb;"><strong>Task Title</strong></td>
                <td style="padding: 12px; border: 1px solid #ddd;">${taskTitle}</td>
            </tr>
            <tr>
                <td style="padding: 12px; border: 1px solid #ddd; background-color: #f1f5fb;"><strong>New Status</strong></td>
                <td style="padding: 12px; border: 1px solid #ddd;">${newStatus}</td>
            </tr>
            </table>

            <p style="margin-top: 30px; font-size: 14px;">Please log in to your dashboard to view more information or take any further actions.</p>
            
            <div style="margin-top: 25px; text-align: center;">
                <a href="https://jasmineautomate.vercel.app/" 
                style="background-color: #0047AB; color: #fff; text-decoration: none; padding: 12px 20px; border-radius: 6px; display: inline-block; font-weight: bold;">
                Go to Dashboard
                </a>
            </div>

            <p style="margin-top: 40px; font-size: 14px;">Warm regards,</p>
            <p style="font-weight: 600; font-size: 15px;">Jasmine Automate<br/>Productivity & Workflow Team</p>
        </div>

        <div style="background-color: #f1f1f1; color: #777; text-align: center; padding: 15px; border-top: 1px solid #ddd; border-radius: 0 0 8px 8px; font-size: 12px;">
            <p style="margin: 0;">© ${new Date().getFullYear()} Jasmine Automate. All rights reserved.</p>
        </div>
        </div>
    `;

    await sendMail(assigneeEmail, subject, htmlBody);
};

export default changeTaskStatusEmail;