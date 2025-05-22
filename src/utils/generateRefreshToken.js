import { User } from "../models/user.model.js"

const generateRefreshToken = async (userId) => {
    const foundUser = await User.findById(userId);

    const refreshToken = await foundUser.generateRefreshToken();
    
    return refreshToken;
}

export { generateRefreshToken }