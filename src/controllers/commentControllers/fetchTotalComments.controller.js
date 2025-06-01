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

    const taskAssignedTo = foundTask.taskAssignedTo.toString();

    const taskCreatedBy = foundTask.taskCreatedBy.toString();
    
    const comments = await Comment.find({
        commentedTask: taskId,
        commentedBy: {
            $in: [taskAssignedTo, taskCreatedBy],
        },
    })
    .populate("commentedBy", "fullname email").select("-_id -__v")
    .populate("commentedTask", "taskTitle")

    // console.log(comments)

    const assignedToComments = [];
    const createdByComments = [];

    for (const comment of comments) {
        const commenterId = comment.commentedBy._id.toString();

        if (commenterId === taskAssignedTo) {
            assignedToComments.push(comment);
        } else if (commenterId === taskCreatedBy) {
            createdByComments.push(comment);
        }
    }

    return response.status(200)
    .json(
        new apiResponse(200, {assignedToComments, createdByComments}, `All comments related to task '${foundTask.taskTitle}' fetched`)
    )
});

export {fetchTotalComments}