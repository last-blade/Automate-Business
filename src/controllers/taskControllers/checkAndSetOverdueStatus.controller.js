import overdueTasksNotificationEmail from "../../emails/taskEmails/overdueTasksNotificationEmail.js";
import { apiResponse, asyncHandler, Task, User } from "../allImports.js";


const sendOverdueEmailsToUsers = async (userIdsSet) => {
    for (const userId of userIdsSet) {
        const user = await User.findById(userId);

        if (!user || !user.email) continue;

        const overdueCount = await Task.countDocuments({
            taskAssignedTo: userId,
            taskStatus: "Overdue"
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
        taskStatus: { $ne: "Overdue" },
    });

    const userIdsSet = new Set();
    allTasks.forEach(task => {
        userIdsSet.add(task.taskAssignedTo.toString());
    });

    await Task.updateMany(
        { 
            taskDueDate: { $lt: currentDate },
            taskStatus: { $ne: "Overdue" },
        },
        { $set: { taskStatus: "Overdue" } }
    );

    await sendOverdueEmailsToUsers(userIdsSet);

    return response.sendStatus(200);

});

export {checkAndSetOverdueStatus}