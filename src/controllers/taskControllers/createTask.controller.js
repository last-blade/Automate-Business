import { apiError, apiResponse, asyncHandler, Task } from "../allImports.js";

const createTask = asyncHandler(async (request, response) => {
    const {taskTitle, taskDescription, taskAssignee, taskCategory, taskDueDate, taskPriority, taskFrequency} = request.body;

    if([taskTitle, taskDescription, taskAssignee, taskCategory, taskDueDate, taskPriority].some((inputField) => inputField.trim === "")){
        throw new apiError(404, "All fields are required")
    }

    if (!taskFrequency || typeof taskFrequency !== "object" || !taskFrequency.type) {
        throw new apiError(400, "taskFrequency with 'type' is required");
    }

    const newTask = await Task.create({
        taskTitle, 
        taskDescription, 
        taskAssignee, 
        taskCategory, 
        taskDueDate, 
        taskPriority,
        taskFrequency: taskFrequency || "NA",
        taskCreatedBy: request.user?.id,
    });

    const createdTask = await Task.findById(newTask._id);

    if(!createTask){
        throw new apiError(500, "Something went wrong while assigning task")
    }

    return response.status(201)
    .json(
        new apiResponse(201, createdTask, "Task assigned successfully")
    )

});

export {createTask}