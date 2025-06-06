import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const authorizeRoles = (...allowedRoles) => {
  return asyncHandler(async (request, response, next) => {
    if (!request.user || !allowedRoles.includes(request.user.role)) {
      return response.status(403)
        .json(
            new apiError(403, "Access denied")
        );
    }

    next();
    
  });
};

export { authorizeRoles };