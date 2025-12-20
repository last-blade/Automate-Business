import taskDeletedEmail from "../../emails/taskEmails/taskDeletedEmail.js";
import { deleteFromCloudinary } from "../../utils/cloudinary.js";
import { Activity, apiError, apiResponse, asyncHandler, Task } from "../allImports.js";

const deleteTask = asyncHandler(async (request, response) => {
    const {taskId} = request?.params;

    if(!taskId){
        throw new apiError(404, "Task id not found!")
    }

    const foundTask = await Task.findById(taskId).populate("taskAssignedTo", "fullname email whatsappNumber").populate("taskCreatedBy", "fullname");

    if(!foundTask){
        return response.status(404)
        .json(
            new apiResponse(404, {}, "Task not found, task may be deleted")
        )
    }

    if(foundTask.taskCreatedBy._id.toString() !== request.user.id){
        throw new apiError(403, "Access denied")
    }

    await Task.findByIdAndDelete(taskId);

    if(foundTask.taskImage?.public_id){
        await deleteFromCloudinary(foundTask.taskImage?.public_id)
    }

    // Sending task deletion email
    await taskDeletedEmail({
        taskTitle: foundTask.taskTitle,
        assigneeName: foundTask.taskAssignedTo.fullname,
        assigneeEmail: foundTask.taskAssignedTo.email,
        phone: foundTask.taskAssignedTo.whatsappNumber,
    });

    await Activity.create({
        messageType: "task_deleted",
        message: `${foundTask.taskCreatedBy.fullname} deleted task: ${foundTask.taskTitle}`,
        creatorName: foundTask.taskCreatedBy.fullname,
        user: foundTask.taskAssignedTo._id,
        task: foundTask._id,
    });

    return response.status(200)
    .json(
        new apiResponse(200, {}, "Task deleted successfully")
    )
});

export {deleteTask}