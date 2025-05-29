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
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h2 style="color: #1976D2;">📌 Task Update Notification</h2>
        <p>Dear <strong>${assigneeName}</strong>,</p>

        <p>The task assigned to you has been updated by <strong>${editorName}</strong> in <strong>KPS Automate Business Solutions</strong>.</p>

        <h3 style="margin-top: 30px;">📝 Task Summary</h3>

        <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%; font-size: 14px;">
            <thead style="background-color: #f5f5f5;">
                <tr>
                    <th>Field</th>
                    <th>Previous</th>
                    <th>Updated</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Title</strong></td>
                    <td>${oldTask.taskTitle}</td>
                    <td>${newTask.taskTitle}</td>
                </tr>
                <tr>
                    <td><strong>Description</strong></td>
                    <td>${oldTask.taskDescription}</td>
                    <td>${newTask.taskDescription}</td>
                </tr>
                <tr>
                    <td><strong>Category</strong></td>
                    <td>${oldTask.taskCategory}</td>
                    <td>${newTask.taskCategory}</td>
                </tr>
                <tr>
                    <td><strong>Due Date</strong></td>
                    <td>${formatDate(oldTask.taskDueDate)}</td>
                    <td>${formatDate(newTask.taskDueDate)}</td>
                </tr>
                <tr>
                    <td><strong>Priority</strong></td>
                    <td>${oldTask.taskPriority}</td>
                    <td>${newTask.taskPriority}</td>
                </tr>
                <tr>
                    <td><strong>Assigned To</strong></td>
                    <td>${oldTask.taskAssignedTo.fullname}</td>
                    <td>${newTask.taskAssignedTo.fullname}</td>
                </tr>
                ${
                    oldTask.taskFrequency || newTask.taskFrequency
                        ? `
                <tr>
                    <td><strong>Frequency</strong></td>
                    <td>${oldTask.taskFrequency?.type || "-"}</td>
                    <td>${newTask.taskFrequency?.type || "-"}</td>
                </tr>`
                        : ""
                }
            </tbody>
        </table>

        <p style="margin-top: 25px;">If you have any questions regarding these changes, please connect with your team lead.</p>

        <p>Warm regards,<br><strong>KPS Automate Business Solutions</strong> Team</p>
    </div>
    `;

    await sendMail(assigneeEmail, subject, htmlBody);
};

export default taskEditedEmail;
