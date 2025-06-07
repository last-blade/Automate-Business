import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import { apiError, apiResponse, asyncHandler, Support } from "../allImports.js";

const raiseTicket = asyncHandler(async (request, response) => {
    const {subject, category, priority, description} = request.body;

    if([subject, category, priority, description].some(inputField => inputField === undefined || inputField.trim() === "")){
        throw new apiError(404, "All compulsory fields are required")
    }

    const attachFileLocalPath = request.file?.path;

    let attachFile = null;

    if(attachFileLocalPath){
        const ticketImageUploaded = await uploadOnCloudinary(attachFileLocalPath);
        
        if(ticketImageUploaded){
            attachFile = {
                url: ticketImageUploaded.url,
                public_id: ticketImageUploaded.public_id,
            }
        }
    }

    const newTicket = await Support.create({
        subject, 
        category, 
        priority, 
        description, 
        attachFile,
        ticketCreatedBy: request.user.id,
    });

    return response.status(201)
    .json(
        new apiResponse(201, newTicket, "Ticket raised successfully")
    )

});

export {raiseTicket}