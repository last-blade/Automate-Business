import mongoose from "mongoose";
import { apiError, apiResponse, asyncHandler, Comment, Task } from "../allImports.js";

const fetchTotalComments = asyncHandler(async (request, response) => {

    const {taskId} = request?.params;

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

    const taskAssignedTo = foundTask.taskAssignedTo;

    const taskAssignedBy = foundTask.taskCreatedBy;

    const comments = await Comment.find({
        commentedTask: taskId,
        commentedBy: {
            $in: [taskAssignedTo, taskAssignedBy],
        },
    })
    .populate("commentedBy", "fullname email").select("-_id -__v")

    return response.status(200)
    .json(
        new apiResponse(200, comments, `All comments related to task ${taskId} fetched`)
    )
});

export {fetchTotalComments}