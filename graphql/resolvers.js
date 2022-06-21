const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = {
    createUser: async function(args, req) {
        const email = args.userInput.email;
        const name = args.userInput.name;
        const password = args.userInput.password;

        const existingUser = await User.findOne({email: email});
        if (existingUser) {
            const error = new Error('Email already exists!');
            throw error;
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            email: email,
            name: name,
            password: hashedPassword
        });
        const createdUser = await user.save();
        return { ...createdUser._doc, _id: createdUser._id.toString() };
    }
};