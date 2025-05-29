import mongoose from "mongoose";
import { apiResponse, asyncHandler, Task } from "../allImports.js";

const fetchTasksAssignedToMe = asyncHandler(async (request, response) => {

    const userId = request.user?.id;

    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.limit) || 10;
    const skip = (page - 1) * 10;

    const myTasksAssignedByLeader = await Task.aggregate([
        {
            $match: {
                taskAssignedTo: new mongoose.Types.ObjectId(userId)
            }
        },

        {
            $skip: skip
        },

        {
            $limit: limit
        },

        {
            $sort: {
                createdAt: -1
            }
        },

        {
            $project: {_id: 0, __v: 0, taskAssignedTo: 0}
        }
    ]);

    if(myTasksAssignedByLeader.length === 0){
        return response.status(200)
        .json(
            new apiResponse(200, myTasksAssignedByLeader, "No task assigned to you")
        )
    }

    return response.status(200)
    .json(
        new apiResponse(200, myTasksAssignedByLeader, "Task assigned to you fetched successfully")
    )

});

export {fetchTasksAssignedToMe};