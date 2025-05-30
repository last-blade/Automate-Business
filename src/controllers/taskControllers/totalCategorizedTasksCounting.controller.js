import mongoose from "mongoose";
import { apiResponse, asyncHandler, Task } from "../allImports.js";

const totalCategorizedTasksCounting = asyncHandler(async (request, response) => {
    const userId = new mongoose.Types.ObjectId(request.user?.id);

    const createdByMe = await Task.aggregate([
        {
            $match: {
                taskCreatedBy: userId
            }
        },
        {
            $group: {
                _id: "$taskStatus",
                count: { $sum: 1 }
            }
        }
    ]);

    const assignedToMe = await Task.aggregate([
        {
            $match: {
                taskAssignedTo: userId
            }
        },
        {
            $group: {
                _id: "$taskStatus",
                count: { $sum: 1 }
            }
        }
    ]);

    const formatCounts = (arr) => {
        const counts = arr.reduce((acc, curr) => {
            acc[curr._id] = curr.count;
            return acc;
        }, {});
        const totalCount = arr.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.count
        }, 0);
        return { counts, totalCount };
    };

    const result = {
        tasksCreatedByMe: formatCounts(createdByMe),
        tasksAssignedToMe: formatCounts(assignedToMe)
    };

    return response.status(200).json(new apiResponse(200, result, "Categorized tasks counting fetched uccessfully"));
});

export { totalCategorizedTasksCounting };
