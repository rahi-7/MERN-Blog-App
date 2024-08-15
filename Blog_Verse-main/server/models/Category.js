const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profile'
    },
    name: {
        type: String,
        required: true,
        maxlength: 30
    }
}, { timestamps: true });

module.exports = mongoose.model('category', CategorySchema);
// This schema sets up a structured way to store and retrieve blog data,
// ensuring that related information (like users and profiles) is properly linked and interactions with the blog are recorded.