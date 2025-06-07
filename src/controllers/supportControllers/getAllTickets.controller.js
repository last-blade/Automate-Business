import { apiResponse, asyncHandler, Support } from "../allImports.js";

const getAllTickets = asyncHandler(async (request, response) => {

    const allTickets = await Support.find({}).populate("ticketCreatedBy", "fullname email").select("-__v -_id");

    return response.status(200)
    .json(
        new apiResponse(200, allTickets, "All tickets fetched successfully")
    )

});

export {getAllTickets}