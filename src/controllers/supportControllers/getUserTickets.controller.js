import { apiResponse, asyncHandler, Support } from "../allImports.js";

const getUserTickets = asyncHandler(async (request, response) => {
    const userTickets = await Support.find({
        ticketCreatedBy: request.user.id,
    });

    if(!userTickets){
        return response.status(200)
        .json(
            new apiResponse(404, "No ticket found")
        )
    }

    return response.status(200)
    .json(
        new apiResponse(200, userTickets, "Tickets fetched successfully")
    )

});

export {getUserTickets}