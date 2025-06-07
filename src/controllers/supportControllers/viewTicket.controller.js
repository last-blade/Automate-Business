import { apiError, apiResponse, asyncHandler, Support } from "../allImports.js";

const viewTicket = asyncHandler(async (request, response) => {
    const {ticketId} = request.params;

    if(!ticketId){
        throw new apiError(404, "Ticket ID not found")
    }

    const foundTicket = await Support.findById(ticketId).populate("ticketCreatedBy", "fullname email").select("-_id -__v");

    if(!foundTicket){
        throw new apiError(404, "Ticket not found, maybe deleted")
    }

    return response.status(200)
    .json(
        new apiResponse(200, foundTicket, "Ticket fetched successfully")
    )

});

export {viewTicket}