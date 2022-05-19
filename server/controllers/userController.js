const { User } = require("../models/User");

registerNewUser = async (userInformation) => {
    const user = await new User(userInformation);
    await user.save();
}

login = async (email, password) => {

    const user = await User.findOne({ email: email });

    if (!user) {
        throw new Error("Email not found");
    }
        
    const isMatch = await user.comparePassword(password)
    
    if (!isMatch) {
        throw new Error("Wrong password")
    }

    return await user.generateToken();
}

module.exports = {
    registerNewUser,
    login
}