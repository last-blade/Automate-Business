import { apiError, apiResponse, asyncHandler, User } from "../allImports.js";

const changeWhatsappNumber = asyncHandler(async (request, response) => {
    
    const userId = request.user?.id;
    const {whatsappNumber} = request.body;

    if(!whatsappNumber){
        throw new apiError(404, "WhatsaApp number is required")
    }

    const foundUser = await User.findByIdAndUpdate(userId, {
        $set: {
            whatsappNumber
        }
    });

    return response.status(200)
    .json(
        new apiResponse(200, {}, `WhatsApp number changed successfully`)
    )

});

export {changeWhatsappNumber}