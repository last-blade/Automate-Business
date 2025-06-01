import mongoose from "mongoose";
import { apiResponse, asyncHandler, Task } from "../allImports.js";

const fetchCategorizedTasks = asyncHandler(async (request, response) => {
    const {query} = request.query;

    const userId = request.user?.id;

    const categorizedTasks = await Task.aggregate([
        {
            $match: {
                taskAssignedTo: new mongoose.Types.ObjectId(userId),
                taskStatus: query,
            }
        },

        {
            $group: {
                _id: "$taskStatus",
                totalTasks: {$sum: 1},
                allTasks: {$push: "$$ROOT"}
            }
        },

        // {
        //     $match: {
        //         _id: query
        //     }
        // },

        {
            $unwind: "$allTasks"
        }
    ]);

    return response.status(200)
    .json(
        new apiResponse(200, categorizedTasks, "Fecthed")
    )

});

export {fetchCategorizedTasks}