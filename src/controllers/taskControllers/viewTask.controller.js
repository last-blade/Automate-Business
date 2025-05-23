import { apiError, apiResponse, asyncHandler, Task } from "../allImports.js";

const viewTask = asyncHandler(async (request, response) => {
    const {taskId} = request?.params;

    if(!taskId){
        throw new apiError(404, "Task id not found!")
    }

    const foundTask = await Task.findById(taskId).select("-__v -_id");

    if(!foundTask){
        throw new apiError(404, "Task not found, task may be deleted")
    }

    return response.status(200)
    .json(
        new apiResponse(200, foundTask, "Task found successfully")
    )
});

export {viewTask}