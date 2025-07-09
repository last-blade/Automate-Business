import overdueTasksNotificationEmail from "../../emails/taskEmails/overdueTasksNotificationEmail.js";
import { Activity, asyncHandler, Task, User } from "../allImports.js";


const sendOverdueEmailsToUsers = async (userIdsSet) => {
    for (const userId of userIdsSet) {
        const user = await User.findById(userId);

        if (!user || !user.email) continue;

        const overdueCount = await Task.countDocuments({
            taskAssignedTo: userId,
            taskStatus: "Overdue"
        });

        await Activity.create({
            messageType: "tasks_overdue",
            message: "Your some tasks marked as overdue",
            user: userId,
            task: user.taskAssignedTo,
            creatorName: "System"
        });

        if (overdueCount > 0) {
            await overdueTasksNotificationEmail({
                fullname: user.fullname || "User",
                email: user.email,
                totalOverdueTasks: overdueCount,
            });
        }
    }
};


const checkAndSetOverdueStatus = asyncHandler(async (request, response) => {
    const currentDate = new Date();

    const allTasks = await Task.find({
        taskDueDate: { $lt: currentDate },
        taskStatus: { $in: ["Pending", "In Progress"] },
        taskCreatedBy: request.user.id,
    });

    const userIdsSet = new Set();

    if(allTasks.length > 0){
        allTasks.forEach(task => {
            userIdsSet.add(task.taskAssignedTo.toString());
        });
    }

    await Task.updateMany(
        { 
            taskDueDate: { $lt: currentDate },
            taskStatus: { $in: ["Pending", "In Progress"] }
        },
        { $set: { taskStatus: "Overdue" } }
    );

    if(userIdsSet.size > 0){
        await sendOverdueEmailsToUsers(userIdsSet);
    }

    return response.sendStatus(200);
});


export {checkAndSetOverdueStatus}