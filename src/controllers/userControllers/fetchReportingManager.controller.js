import mongoose from "mongoose";
import { apiResponse, asyncHandler, NewMember } from "../allImports.js";

const fetchReportingManager = asyncHandler(async (request, response) => {
    const loggedInUser = request.user?.id;

    const reportingManagersList = await NewMember.find({
        newMemberCreatedBy: loggedInUser
        })
        .populate({
        path: 'newMember',
        match: { accountType: { $in: ['Admin', 'Manager'] } },
        select: '-password -__v -reportingManager -createdAt -updatedAt'
    }).select("-newMemberCreatedBy -_id -__v -password");

    const filteredList = reportingManagersList.filter(item => item.newMember !== null);

    return response.status(200)
    .json(
        new apiResponse(200, filteredList, "All reporting managers fetched successfully")
    )

});

export {fetchReportingManager}