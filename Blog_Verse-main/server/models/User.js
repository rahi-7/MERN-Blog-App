const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name can not be empty'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email can not be empty'],
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true })

module.exports = mongoose.model('user', userSchema);
//
//This Mongoose schema defines the User model with fields for:

//name: Required string, must not be empty.
//email: Required string, must not be empty.
//password: Required string, must not be empty.
//It also includes automatic timestamps for record creation and updates.