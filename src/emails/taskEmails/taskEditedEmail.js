import { sendMail } from "../../utils/sendEmail.js";
import dayjs from "dayjs";

const taskEditedEmail = async ({
    assigneeName,
    assigneeEmail,
    editorName,
    oldTask,
    newTask,
}) => {
    const subject = `✏️ Task Updated - ${oldTask.taskTitle}`;

    const formatDate = (date) => dayjs(date).format("DD MMM YYYY");

    const htmlBody = `
        <div style="max-width: 700px; margin: auto; border: 1px solid #ddd; border-radius: 8px; font-family: 'Segoe UI', Tahoma, sans-serif; background-color: #fff; color: #333;">
        <div style="background-color: #1976D2; color: #fff; padding: 20px 30px; border-radius: 8px 8px 0 0;">
        <h2 style="margin: 0;">Jasmine Automate</h2>
        <p style="margin: 4px 0 0;">Task Edited Notification</p>
        </div>
            <div style="padding: 30px;">
            <p style="font-size: 16px;">Dear <strong>${assigneeName}</strong>,</p>
            <p style="font-size: 15px;">Your assigned task has been updated by <strong>${editorName}</strong>.</p>

            <h3 style="margin-top: 30px; font-size: 17px; color: #1976D2;">📝 Task Update Summary</h3>

            <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 14px;">
                <thead style="background-color: #f1f1f1;">
                <tr>
                    <th style="border: 1px solid #ccc; padding: 10px;">Field</th>
                    <th style="border: 1px solid #ccc; padding: 10px;">Previous</th>
                    <th style="border: 1px solid #ccc; padding: 10px;">Updated</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td style="border: 1px solid #eee; padding: 10px;"><strong>Title</strong></td>
                    <td style="border: 1px solid #eee; padding: 10px;">${oldTask.taskTitle}</td>
                    <td style="border: 1px solid #eee; padding: 10px;">${newTask.taskTitle}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #eee; padding: 10px;"><strong>Description</strong></td>
                    <td style="border: 1px solid #eee; padding: 10px;">${oldTask.taskDescription}</td>
                    <td style="border: 1px solid #eee; padding: 10px;">${newTask.taskDescription}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #eee; padding: 10px;"><strong>Category</strong></td>
                    <td style="border: 1px solid #eee; padding: 10px;">${oldTask.taskCategory}</td>
                    <td style="border: 1px solid #eee; padding: 10px;">${newTask.taskCategory}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #eee; padding: 10px;"><strong>Due Date</strong></td>
                    <td style="border: 1px solid #eee; padding: 10px;">${formatDate(oldTask.taskDueDate)}</td>
                    <td style="border: 1px solid #eee; padding: 10px;">${formatDate(newTask.taskDueDate)}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #eee; padding: 10px;"><strong>Priority</strong></td>
                    <td style="border: 1px solid #eee; padding: 10px;">${oldTask.taskPriority}</td>
                    <td style="border: 1px solid #eee; padding: 10px;">${newTask.taskPriority}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #eee; padding: 10px;"><strong>Assigned To</strong></td>
                    <td style="border: 1px solid #eee; padding: 10px;">${oldTask.taskAssignedTo.fullname}</td>
                    <td style="border: 1px solid #eee; padding: 10px;">${newTask.taskAssignedTo.fullname}</td>
                </tr>
                ${
                    oldTask.taskFrequency || newTask.taskFrequency
                    ? `
                <tr>
                    <td style="border: 1px solid #eee; padding: 10px;"><strong>Frequency</strong></td>
                    <td style="border: 1px solid #eee; padding: 10px;">${oldTask.taskFrequency?.type || "-"}</td>
                    <td style="border: 1px solid #eee; padding: 10px;">${newTask.taskFrequency?.type || "-"}</td>
                </tr>`
                    : ""
                }
                </tbody>
            </table>

            <p style="margin-top: 30px; font-size: 14px;">Please log in to your Jasmine Automate dashboard to view and manage this task promptly.</p>

            <div style="margin-top: 25px; text-align: center;">
                <a href="https://jasmineautomate.vercel.app/" 
                style="background-color: #1976D2; color: #fff; text-decoration: none; padding: 12px 20px; border-radius: 6px; display: inline-block; font-weight: bold;">
                Go to Dashboard
                </a>
            </div>

            <p style="margin-top: 25px; font-size: 14px;">If you have any questions or concerns, please connect with your team lead or manager.</p>

            <p style="margin-top: 30px; font-size: 14px;">Warm regards,</p>
            <p style="font-weight: 600; font-size: 15px;">Jasmine Automate<br/>Productivity & Workflow Team</p>
            </div>

            <div style="background-color: #f9f9f9; text-align: center; padding: 15px; font-size: 12px; color: #999; border-top: 1px solid #ddd; border-radius: 0 0 8px 8px;">
            <p style="margin: 0;">© ${new Date().getFullYear()} Jasmine Automate. All rights reserved.</p>
            </div>
        </div>
    `;

    await sendMail(assigneeEmail, subject, htmlBody);
};

export default taskEditedEmail;
