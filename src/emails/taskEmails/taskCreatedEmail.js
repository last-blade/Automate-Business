import { sendMail } from "../../utils/sendEmail.js";
import dayjs from "dayjs";

const taskCreatedEmail = async ({ taskTitle, assigneeName, assigneeEmail, dueDate, taskDescription, taskPriority, taskCategory }) => {
    const subject = "📝 New Task Assigned - Jasmine Automate";

    const formattedDueDate = dueDate ? dayjs(dueDate).format("D MMMM YYYY") : null;

    const htmlBody = `
        <div style="max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9; color: #333;">
            <div style="background-color: #0047AB; color: #fff; padding: 20px 30px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0; font-weight: 600;">Jasmine Automate</h2>
            <p style="margin: 5px 0 0;">New Task Assigned</p>
            </div>

            <div style="padding: 30px;">
            <p style="font-size: 16px;">Hi <strong>${assigneeName}</strong>,</p>
            <p style="font-size: 15px;">You have been assigned a new task through our system. Below are the task details:</p>

            <table style="width: 100%; margin-top: 25px; border-collapse: collapse; font-size: 14px;">
                <tr>
                <td style="padding: 12px; border: 1px solid #ddd; background-color: #f1f5fb;"><strong>Task</strong></td>
                <td style="padding: 12px; border: 1px solid #ddd;">${taskTitle}</td>
                </tr>
                ${formattedDueDate ? `
                <tr>
                <td style="padding: 12px; border: 1px solid #ddd; background-color: #f1f5fb;"><strong>Due Date</strong></td>
                <td style="padding: 12px; border: 1px solid #ddd;">${formattedDueDate}</td>
                </tr>
                <tr>
                <td style="padding: 12px; border: 1px solid #ddd; background-color: #f1f5fb;"><strong>Description</strong></td>
                <td style="padding: 12px; border: 1px solid #ddd;">${taskDescription}</td>
                </tr>
                <tr>
                <td style="padding: 12px; border: 1px solid #ddd; background-color: #f1f5fb;"><strong>Priority</strong></td>
                <td style="padding: 12px; border: 1px solid #ddd;">${taskPriority}</td>
                </tr>
                <tr>
                <td style="padding: 12px; border: 1px solid #ddd; background-color: #f1f5fb;"><strong>Category</strong></td>
                <td style="padding: 12px; border: 1px solid #ddd;">${taskCategory}</td>
                </tr>
                ` : ''}
            </table>

            <p style="margin-top: 30px; font-size: 14px;">Please log in to your Jasmine Automate dashboard to view and manage this task promptly.</p>

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

export default taskCreatedEmail;
