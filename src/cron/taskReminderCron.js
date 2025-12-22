import cron from "node-cron";
import { Task } from "../models/task.model.js";
import taskReminderEmail from "../emails/taskEmails/taskReminderEmail.js";
import { User } from "../models/user.model.js";

const sendDailyAndWeeklyTaskEmails = async () => {
    console.log("Running daily/weekly task reminder email cron...");

    const today = new Date();
    const currentDay = today.toLocaleString("en-US", { weekday: "long", timeZone: "Asia/Kolkata" });

    // Fetch tasks with frequency = daily or weekly
    const tasks = await Task.find({
        $or: [
            { "taskFrequency.type": "daily" },
            {
                "taskFrequency.type": "weekly",
                "taskFrequency.details.daysOfWeek.day": currentDay
            }
        ]
    }).populate("taskAssignedTo", "fullname email");

    for (const task of tasks) {
        const assignee = task.taskAssignedTo;
        const assignedUser = await User.findById(assignee);

        if (!assignee || !assignee.email) continue;

        await taskReminderEmail({
            taskTitle: task.taskTitle,
            assigneeName: assignee.fullname,
            assigneeEmail: assignee.email,
            dueDate: task.taskDueDate,
            taskDescription: task.taskDescription,
            taskPriority: task.taskPriority,
            taskCategory: task.taskCategory,
            taskImage: task.taskImage?.url || null,
            phone: assignedUser?.whatsappNumber,
        });

        console.log(`Reminder email sent to ${assignee.fullname} (${assignee.email})`);
    }
};

// Schedule job at 10:00 AM IST daily
cron.schedule("0 10 * * *", () => {
    sendDailyAndWeeklyTaskEmails();
}, {
    timezone: "Asia/Kolkata"
});

export default sendDailyAndWeeklyTaskEmails;
