const bcrypt = require('bcrypt');
const validator = require('validator');

const User = require('../models/user');

module.exports = {
    createUser: async function(args, req) {
        const email = args.userInput.email;
        const name = args.userInput.name;
        const password = args.userInput.password;

        const errors = [];
        if (!validator.isEmail(email)) {
            errors.push({ message: 'Email is invalid!' });
        }
        if (validator.isEmpty(password) || !validator.isLength(password, { min: 5 })) {
            errors.push({ message: 'Password must be longer!' });
        }

        if (errors.length > 0) {
            const error = new Error('Invalid input!');
            error.data = errors;
            error.code = 422;
            throw error;
        }

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