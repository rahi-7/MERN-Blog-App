const asyncHandler = require("express-async-handler");
const { validateRegisterInput } = require("../utils/validators");
const bcryptjs = require("bcryptjs");
const { isValidJSON } = require("../utils/helpers");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY


const User = require("../models/User");
const Profile = require("../models/Profile");

// @Desc    Register New user through formdata
// @Route   /auth/register
// @Access  Public
const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Validating Data
    const validate = validateRegisterInput(email, name, password);
    //Check validation: If the data is invalid, send a 400 response with error messages.
    if (!validate.valid) {
        res.status(400)
        throw new Error(JSON.stringify(validate.errors))
    }

    // Check existing user: If a user with the given email already exists, send a 400 response with an error message.
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400)
        throw new Error(JSON.stringify({ err: 'User Already exists' }))
    }

    // Hash Password mixesit with salt
    const salt = await bcryptjs.genSalt(10);
    // This scrambled version is what gets saved in the database.
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Save user in database
    //Create and save user
    const user = new User({
        name,
        email,
        password: hashedPassword
    })

    await user.save();

    // Generate Token
    const token = generateToken(user._id);


    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        token
    });

    // Create profile for user
    const profile = new Profile({
        user: user._id,
    })
    await profile.save();

})

// @Desc    Login User through formdata
// @Route   /auth/login
// @Access  Public
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (!userExists) {
        res.status(400)
        throw new Error(JSON.stringify({ err: 'No such user exists' }))
    }

    //Compare the provided password with the stored hashed password.
    //send a 400 response with an error message.
    const isMatch = await bcryptjs.compare(password, userExists.password);
    if (!isMatch) {
        res.status(400)
        throw new Error(JSON.stringify({ err: 'Incorrect Password' }))
    }

    // Check if user is not blocked
    const profile = await Profile.findOne({ user: userExists._id });
    if (profile.isBlocked) {
        res.status(400)
        throw new Error('You have been blocked.')
    }

    res.json({
        _id: userExists._id,
        name: userExists.name,
        email: userExists.email,
        createdAt: userExists.createdAt,
        updatedAt: userExists.updatedAt,
        token: generateToken(userExists._id)
    });
})

// @Desc    Change Password
// @Route   /auth/change-password
// @Access  Private
const changePassword = asyncHandler(async (req, res) => {

    const { oldPassword, newPassword } = req.body;

    //Find user if exists
    const userExists = await User.findById(req.user._id);

    if (!userExists) {
        res.status(400)
        throw new Error('No such user exists');
    }

    if (userExists._id.toString() !== req.user._id.toString()) {
        res.status(400)
        throw new Error('You are not authorized to process this request');
    }

    // Verify Password
    const isMatch = await bcryptjs.compare(oldPassword, userExists.password);
    if (!isMatch) {
        res.status(400)
        throw new Error(JSON.stringify({ err: 'Old Password is incorrect' }))
    }

    // Hash Password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);
    

    userExists.password = hashedPassword;
    await userExists.save();

    res.status(200).json({ msg: 'Password Changed' });

})

// Generate Token
//Use jwt.sign() to create a token that includes the payload and signs it with a secret key, setting an expiration time.
/* generateToken function is like a machine that takes user information, mixes it with a secret, and produces a secure "ID card"
 (token) that proves who the user is. */
const generateToken = (id) => {
    const payload = { id };
    return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1d' })
}

module.exports = {
    register,
    login,
    changePassword
}