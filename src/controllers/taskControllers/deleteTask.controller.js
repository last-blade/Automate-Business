import taskDeletedEmail from "../../emails/taskEmails/taskDeletedEmail.js";
import { Activity, apiResponse, asyncHandler, Task } from "../allImports.js";

const deleteTask = asyncHandler(async (request, response) => {
    const {taskId} = request?.params;

    if(!taskId){
        throw new apiError(404, "Task id not found!")
    }

    const foundTask = await Task.findById(taskId).populate("taskAssignedTo", "fullname email").populate("taskCreatedBy", "fullname");

    if(!foundTask){
        return response.status(404)
        .json(
            new apiResponse(404, {}, "Task not found, task may be deleted")
        )
    }

    await Task.findByIdAndDelete(taskId);

    // Sending task deletion email
    await taskDeletedEmail({
        taskTitle: foundTask.taskTitle,
        assigneeName: foundTask.taskAssignedTo.fullname,
        assigneeEmail: foundTask.taskAssignedTo.email
    });

    await Activity.create({
        messageType: "task_deleted",
        message: `${foundTask.taskCreatedBy.fullname} deleted task: ${foundTask.taskTitle}`,
        user: foundTask.taskAssignedTo._id,
        task: foundTask._id,
    });

    return response.status(200)
    .json(
        new apiResponse(200, {}, "Task deleted successfully")
    )
});

export {deleteTask}