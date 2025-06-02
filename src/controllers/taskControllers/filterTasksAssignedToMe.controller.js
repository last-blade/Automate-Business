import mongoose from "mongoose";
import { apiError, apiResponse, asyncHandler, Task } from "../allImports.js";

const filterTasksAssignedToMe = asyncHandler(async (request, response) => {
    const { taskCategory, taskPriority, taskStatus } = request.body;

    if (!taskCategory && !taskPriority && !taskStatus) {
        throw new apiError(400, "Select at least one field to filter");
    }

    const filter = {
        taskAssignedTo: new mongoose.Types.ObjectId(request.user?.id)
    };

    if (taskCategory) {
        filter.taskCategory = { $regex: new RegExp(`^${taskCategory}$`, "i") };
    };

    if (taskPriority) {
        filter.taskPriority = { $regex: new RegExp(`^${taskPriority}$`, "i") };
    };

    if (taskStatus) {
        filter.taskStatus = { $regex: new RegExp(`^${taskStatus}$`, "i") };
    };

    const filteredTasks = await Task.find(filter);

    return response.status(200).json(
        new apiResponse(200, {filteredTasks, totalTasks: filteredTasks.length}, "Filtered tasks fetched successfully")
    );
});

export {filterTasksAssignedToMe}