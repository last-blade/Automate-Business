import { apiResponse, asyncHandler, Task } from "../allImports.js";

const searchTask = asyncHandler(async (request, response) => {
    let {query} = request.query;

    query = query.toString().trim();

    const searchedTask = await Task.find({
        taskCreatedBy: request.user?.id,
        $or: [
            {
               taskTitle: {$regex: query, $options: "i"} 
            },

            {
                taskDescription: {$regex: query, $options: "i"}
            },

            {
                taskCategory: {$regex: query, $options: "i"}
            }
        ]
    });

    if(searchedTask.length === 0){
        return response.status(200)
        .json(
            new apiResponse(200, {}, `No task found for '${query}'`)
        )
    }

    return response.status(200)
    .json(
        new apiResponse(200, searchedTask, `Tasks found for '${query}'`)
    )

});

export {searchTask}