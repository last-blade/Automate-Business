import changeTaskStatusEmail from "../../emails/taskEmails/changeTaskStatusEmail.js";
import { Activity, apiError, apiResponse, asyncHandler, Task } from "../allImports.js";

const changeTaskStatus = asyncHandler(async (request, response) => {
    const {taskId} = request?.params;

    const status = request.body;

    if(!taskId){
        throw new apiError(404, "Task id not found!")
    }

    const foundTask = await Task.findById(taskId);

    if(!foundTask){
        return response.status(404)
        .json(
            new apiResponse(404, {}, "Task not found, task may be deleted")
        )
    }

    const updatedTask = await Task.findByIdAndUpdate(taskId, {
        $set: {
            taskStatus: status.status
        }
    }, {new: true}).select("-__v -_id").populate("taskCreatedBy", "fullname email whatsappNumber").populate("taskAssignedTo", "fullname");

    if(!updatedTask){
        throw new apiError(500, "Something went wrong while changing the status of the task")
    }

    const {taskTitle, taskCreatedBy, taskStatus, taskAssignedTo} = updatedTask;

    await changeTaskStatusEmail({
        taskTitle,
        assigneeName: taskCreatedBy.fullname,
        assigneeEmail: taskCreatedBy.email,
        newStatus: taskStatus,
        phone: updatedTask?.taskCreatedBy?.whatsappNumber
    });

    await Activity.create({
        messageType: status.status,
        message: `${taskAssignedTo.fullname} marked '${taskTitle}' as ${taskStatus}`,
        user: updatedTask.taskCreatedBy,
        task: taskId,
        creatorName: taskAssignedTo.fullname,
    })

    return response.status(200)
    .json(
        new apiResponse(200, updatedTask, "Task status updated successfully")
    )

});

export {changeTaskStatus}