import mongoose from "mongoose";
import { apiError, apiResponse, asyncHandler, Task, User } from "../allImports.js";
import taskCreatedEmail from "../../emails/taskEmails/taskCreatedEmail.js";

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
        taskCreatedBy: request.user?.id,
    };

    // Include optional field matlab ki "taskFrequency" field if present
    if (taskFrequency) {
        taskData.taskFrequency = taskFrequency;
    }

    const newTask = await Task.create(taskData);

    const createdTask = await Task.findById(newTask._id);

    if (!createdTask) {
        throw new apiError(500, "Something went wrong while assigning task");
    }

    const assigneeUser = await User.findById(taskAssignedTo);

    await taskCreatedEmail({taskTitle, assigneeName: assigneeUser.fullname, assigneeEmail: assigneeUser.email, dueDate: taskDueDate})

    return response.status(201)
    .json(
        new apiResponse(201, createdTask, "Task assigned successfully")
    );
});

export { createTask };
