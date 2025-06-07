import ticketStatusChangedEmail from "../../emails/userEmails/ticketStatusChangedEmail.js";
import { apiError, asyncHandler, Support } from "../allImports.js";

const changeTicketStatus = asyncHandler(async (request, response) => {
    const ticketStatus = request.body;

    const {ticketId} = request?.params;

    if(!ticketId){
        throw new apiError(404, "Ticket ID not found")
    }

    if(ticketStatus.ticketStatus.trim() === "" || ticketStatus.ticketStatus == undefined){
        throw new apiError(404, "Ticket status not changed")
    }

    const foundTicket = await Support.findById(ticketId).populate("ticketCreatedBy", "fullname email");

    if(!foundTicket){
        throw new apiError(404, "Ticket not found")
    }

    await Support.findByIdAndUpdate(ticketId, {
        $set: {
            ticketStatus: ticketStatus.ticketStatus
        }
    });

    await ticketStatusChangedEmail({
        fullname: foundTicket.ticketCreatedBy.fullname || "User",
        email: foundTicket.ticketCreatedBy.email,
        ticketId: foundTicket.ticketId,
        newStatus: ticketStatus.ticketStatus,
    });

    return response.sendStatus(200);

});

export {changeTicketStatus}