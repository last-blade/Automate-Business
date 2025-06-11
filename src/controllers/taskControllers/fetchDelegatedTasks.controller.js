import mongoose from "mongoose";
import { apiResponse, asyncHandler, Task } from "../allImports.js";

const fetchDelegatedTasks = asyncHandler(async (request, response) => {

    const userId = request.user?.id;

    const limit = parseInt(request.query.limit) || 10;
    const page = parseInt(request.query.page) || 1;
    const skip = (page - 1) * limit;

    const filter = {
        taskCreatedBy: new mongoose.Types.ObjectId(userId)
    };

    const totalTasks = await Task.countDocuments(filter);

    const allTasks = await Task.aggregate([
        {
            $match: filter ,
        },

        {
            $skip: skip
        },

        {
            $limit: limit
        },

        {
            $project: {__v: 0}
        },
    ]);

    if(allTasks.length === 0){
        return response.status(200)
        .json(
            new apiResponse(200, {}, "No task found, assign one.")
        )
    }

    return response.status(200)
    .json(
        new apiResponse(200, {page, totalPages: Math.ceil(totalTasks/limit), allTasks}, "All tasks fetched successfully")
    )
});

export {fetchDelegatedTasks}