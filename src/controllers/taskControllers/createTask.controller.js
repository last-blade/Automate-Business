import mongoose from "mongoose";
import { Activity, apiError, apiResponse, asyncHandler, Task, User } from "../allImports.js";
import taskCreatedEmail from "../../emails/taskEmails/taskCreatedEmail.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";

const createTask = asyncHandler(async (request, response) => {
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
            .some(field => field === undefined || field.toString().trim() === "")
    ) {
        throw new apiError(400, "All required fields must be non-empty strings");
    }

    if (!mongoose.Types.ObjectId.isValid(taskAssignedTo)) {
        throw new apiError(400, "taskAssignedTo must be a valid MongoDB ObjectId");
    }

    // if (taskFrequency !== undefined && taskFrequency !== null) {
    //     if (typeof taskFrequency !== "object" || !taskFrequency.type) {
    //         throw new apiError(400, "If provided, taskFrequency must be an object with a 'type' field");
    //     }
    // }
    
    const assignedUser = await User.findById(taskAssignedTo);
    if (!assignedUser) {
        throw new apiError(404, "Assigned user not found");
    }

    // Upload image if provided
    let taskImage = null;
    const taskImageLocalFilePath = request.file?.path;

    if (taskImageLocalFilePath) {
        const taskImageUploaded = await uploadOnCloudinary(taskImageLocalFilePath);
        if (taskImageUploaded) {
            taskImage = {
                url: taskImageUploaded.url,
                public_id: taskImageUploaded.public_id
            };
        }
    }
    // console.log("request file: ",request.file);
    // console.log("task img url: ",taskImageLocalFilePath)

    const taskData = {
        taskTitle,
        taskDescription,
        taskAssignedTo,
        taskCategory,
        taskDueDate,
        taskPriority,
        taskImage,
        taskCreatedBy: request.user?.id,
    };

    // Include optional field matlab ki "taskFrequency" field if present
    if (taskFrequency) {
        taskData.taskFrequency = taskFrequency;
    }

    const newTask = await Task.create(taskData);

    const createdTask = await Task.findById(newTask._id).populate("taskAssignedTo", "fullname email taskDueDate").populate("taskCreatedBy", "fullname email");

    if (!createdTask) {
        throw new apiError(500, "Something went wrong while assigning task");
    }

    const taskAssignedToUser = createdTask.taskAssignedTo;

    await taskCreatedEmail({taskTitle, assigneeName: taskAssignedToUser.fullname, assigneeEmail: taskAssignedToUser.email, dueDate: taskDueDate, taskDescription, taskPriority, taskCategory, taskImage: createdTask?.url})

    await Activity.create({
        messageType: "task_created",
        message: `${createdTask.taskCreatedBy.fullname} created task: ${createdTask.taskTitle}`,
        creatorName: createdTask.taskCreatedBy.fullname,
        user: createdTask.taskAssignedTo._id,
        task: createdTask._id,
    });

    return response.status(201)
    .json(
        new apiResponse(201, createdTask, "Task assigned successfully")
    );
});

export { createTask };
