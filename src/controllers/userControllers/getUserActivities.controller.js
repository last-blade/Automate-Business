import mongoose from "mongoose";
import { Activity, apiResponse, asyncHandler } from "../allImports.js";

const getUserActivities = asyncHandler(async (request, response) => {
    const userId = request.user?.id;

    const limit = parseInt(request.query.limit) || 10;
    const page = parseInt(request.query.page) || 1;
    const skip = (page - 1) * limit;

    const activities = await Activity.aggregate([
        {
            $match: {
                user: new mongoose.Types.ObjectId(userId)
            }
        },

        {
            $sort: {createdAt: -1}
        },

        {
            $skip: skip
        },

        {
            $limit: limit
        }
    ]);

    return response.status(200)
    .json(
        new apiResponse(200, activities, "Activities fetched successfully")
    )

});

export {getUserActivities}