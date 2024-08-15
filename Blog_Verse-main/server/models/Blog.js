const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({       // defines a Mongoose schema for a Blog model in a MongoDB database
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profile',
        required: true
    },
    title: {
        type: String,
        required: true,
        maxlength: 170
    },
    desc: {
        type: String,
        required: true,
    },
    coverPhoto: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    content: [
        {
            image: {
                type: String,
                required: true
            },
            desc: {
                type: String,
                required: true,
            }
        }
    ],
    viewedBy: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
                required: true
            },
            profile: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'profile',
                required: true
            },
        }
    ],
    likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
                required: true
            }
        }
    ],
    dislikes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
                required: true
            }
        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
                required: true
            },
            profile: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'profile',
                required: true
            },
            text: {
                type: String,
                required: true
            }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('blog', BlogSchema);

//This code defines a Mongoose schema for a Blog model in a MongoDB database. It outlines the structure and relationships of blog posts, including:

//User and Profile References: Links to the user and profile associated with the blog.
//Blog Details: Includes title, description, cover photo, category, and content.
//Interactions: Tracks who viewed, liked, disliked, or commented on the blog.
//Timestamps: Automatically tracks creation and modification dates.
//The schema helps organize and manage blog data and interactions in the database.