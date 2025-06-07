import { apiError, asyncHandler, Support } from "../allImports.js";

const changeTicketStatus = asyncHandler(async (request, response) => {
    const ticketStatus = request.body;

    const {tickedId} = request?.params;

    if(!tickedId){
        throw new apiError(404, "Ticket ID not found")
    }

    if(ticketStatus.ticketStatus.trim() === "" || ticketStatus.ticketStatus == undefined){
        throw new apiError(404, "Ticket status not changed")
    }

    const foundTicket = await Support.findById(tickedId);

    if(!foundTicket){
        throw new apiError(404, "Ticket not found")
    }

    await Support.findByIdAndUpdate(tickedId, {
        $set: {
            ticketStatus: ticketStatus.ticketStatus
        }
    });

    return response.sendStatus(200);

});

export {changeTicketStatus}