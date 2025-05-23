import mongoose from "mongoose";
import { apiResponse, asyncHandler, Task } from "../allImports.js";

const fetchUsersAllTasks = asyncHandler(async (request, response) => {

    const userId = request.user?.id;

    const allTasks = await Task.aggregate([
        {
            $match: {
                taskCreatedBy: new mongoose.Types.ObjectId(userId)
            }
        },

        {
            $project: {__v: 0, _id: 0}
        }
    ]);

    if(allTasks.length === 0){
        return response.status(200)
        .json(
            new apiResponse(200, {}, "No task found, assign one.")
        )
    }

    return response.status(200)
    .json(
        new apiResponse(200, allTasks, "All tasks fetched successfully")
    )
});

export {fetchUsersAllTasks}