import mongoose from "mongoose";
import { apiResponse, asyncHandler, Task } from "../allImports.js";

const fetchCategorizedTasksCounting = asyncHandler(async (request, response) => {

    const userId = request.user?.id;

    const allTasksCounting = await Task.aggregate([
        {
            $match: {
                taskAssignedTo: new mongoose.Types.ObjectId(userId)
            }
        },

        {
            $group: {
                _id: "$taskStatus",
                totalTasks: {
                    $sum: 1
                },
            },
        },

        {
            $sort: {
                totalTasks: 1
            }
        }
    ]);

    return response.status(200)
    .json(
        new apiResponse(200, allTasksCounting, "Total categorised tasks counting fetched")
    )
});

export {fetchCategorizedTasksCounting}