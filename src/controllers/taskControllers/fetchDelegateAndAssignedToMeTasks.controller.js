import { apiResponse, asyncHandler, Task } from "../allImports.js";

const fetchDelegateAndAssignedToMeTasks = asyncHandler(async (request, response) => {
    const loggedInUserId = request.user?.id;

    const limit = parseInt(request.query.limit) || 10;
    const page = parseInt(request.query.page) || 1;
    const skip = (page - 1) * limit;

    const filter = {
        $or: [
            { taskCreatedBy: loggedInUserId },
            {
                taskAssignedTo: loggedInUserId,
                taskCreatedBy: { $ne: loggedInUserId }
            }
        ]
    };

    const totalTasks = await Task.countDocuments(filter);
    const tasks = await Task.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

    response.status(200)
    .json(
        new apiResponse(200, {page, totalPages: Math.ceil(totalTasks / limit), totalTasks,tasks}, "All tasks fetched successfully")
    );
});

export { fetchDelegateAndAssignedToMeTasks };
