import mongoose from "mongoose";
import { Activity, apiError, apiResponse, asyncHandler, Task } from "../allImports.js";
import taskEditedEmail from "../../emails/taskEmails/taskEditedEmail.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../../utils/cloudinary.js";

const editTask = asyncHandler(async (request, response) => {
    const {taskId} = request?.params;

    if(!taskId){
        throw new apiError(404, "Task id not found!")
    }

    const foundTask = await Task.findById(taskId).populate("taskAssignedTo", "fullname email").populate("taskCreatedBy", "fullname");

    if(!foundTask){
        throw new apiError(404, "Task not found, task may be deleted")
    }

    const {
        taskTitle,
        taskDescription,
        taskAssignedTo,
        taskCategory,
        taskDueDate,
        taskPriority,
        taskFrequency,
    } = request.body;

    if (
        [taskTitle, taskDescription, taskAssignedTo, taskCategory, taskDueDate, taskPriority]
            .some(inputField =>inputField === undefined || inputField.toString().trim() === "")
    ) {
        throw new apiError(400, "All required fields must be non-empty");
    }

    if (!mongoose.Types.ObjectId.isValid(taskAssignedTo)) {
        throw new apiError(400, "taskAssignedTo must be a valid MongoDB ObjectId");
    }

    if (taskFrequency !== undefined && taskFrequency !== null) {
        if (typeof taskFrequency !== "object" || !taskFrequency.type) {
            throw new apiError(400, "If provided, taskFrequency must be an object with a 'type' field");
        }
    }
    
    const taskData = {
        taskTitle,
        taskDescription,
        taskAssignedTo,
        taskCategory,
        taskDueDate,
        taskPriority,
        // taskCreatedBy: request.user?.id,
    };

    // Include optional field matlab ki "taskFrequency" field if present
    if (taskFrequency) {
        taskData.taskFrequency = taskFrequency;
    }

    const taskImageLocalFilePath = request.file?.path;

    if (taskImageLocalFilePath) {
        // Delete old image from Cloudinary if present
        if (foundTask.taskImage?.public_id) {
            await deleteFromCloudinary(foundTask.taskImage.public_id);
        }

        // Upload new image
        const taskImageUploaded = await uploadOnCloudinary(taskImageLocalFilePath);

        if (taskImageUploaded) {
            taskData.taskImage = {
                url: taskImageUploaded.url,
                public_id: taskImageUploaded.public_id
            };
        }
    }

    const updatedTask = await Task.findByIdAndUpdate(taskId, {
        $set: {
            ...taskData
        }
    }, {new: true}).populate("taskAssignedTo", "fullname email");

    const oldTask = { ...foundTask.toObject() };

    await taskEditedEmail({
        assigneeName: updatedTask.taskAssignedTo.fullname,
        assigneeEmail: updatedTask.taskAssignedTo.email,
        editorName: request.user?.fullname || "A team member",
        oldTask,
        newTask: updatedTask
    });

    await Activity.create({
        messageType: "task_edited",
        message: `${foundTask.taskCreatedBy.fullname} edited task from: ${foundTask.taskTitle} to ${updatedTask.taskTitle}`,
        creatorName: foundTask.taskCreatedBy.fullname,
        user: foundTask.taskAssignedTo._id,
        task: taskId,
    });

    return response.status(201)
    .json(
        new apiResponse(201, updatedTask, "Task updated successfully")
    );
});

export {editTask}