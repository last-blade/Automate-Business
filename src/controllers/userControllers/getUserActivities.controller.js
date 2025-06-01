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
        },

        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "userInfo"
            }
        },

        {
            $unwind: "$userInfo"
        },

        {
            $lookup: {
                from: "tasks",
                localField: "task",
                foreignField: "_id",
                as: "taskInfo"
            }
        },

        {
            $unwind: "$taskInfo"
        },

        {
            $project: {
                _id: 0,
                createdAt: 1,
                "userFullname": "$userInfo.fullname",
                "taskTitle": "$taskInfo.taskTitle",
                messageType: 1,
            }
        }
    ]);

    return response.status(200)
    .json(
        new apiResponse(200, activities, "Activities fetched successfully")
    )

});

export {getUserActivities}