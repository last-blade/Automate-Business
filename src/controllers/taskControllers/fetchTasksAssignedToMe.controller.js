import mongoose from "mongoose";
import { apiResponse, asyncHandler, Task } from "../allImports.js";

const fetchTasksAssignedToMe = asyncHandler(async (request, response) => {

    const userId = request.user?.id;

    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.limit) || 10;
    const skip = (page - 1) * 10;

    const filter = {
        taskAssignedTo: new mongoose.Types.ObjectId(userId)
    }

    const totalTasks = await Task.countDocuments(filter);

    const myTasksAssignedByLeader = await Task.aggregate([
        {
            $match: filter
        },

        {
            $sort: {
                createdAt: -1
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
            $project: {__v: 0, taskAssignedTo: 0}
        }
    ]);

    if(myTasksAssignedByLeader.length === 0){
        return response.status(200)
        .json(
            new apiResponse(200, {}, "No task assigned to you")
        )
    }

    return response.status(200)
    .json(
        new apiResponse(200, {page, totalPages: Math.ceil(totalTasks/limit), myTasksAssignedByLeader}, "Task assigned to you fetched successfully")
    )

});

export {fetchTasksAssignedToMe};