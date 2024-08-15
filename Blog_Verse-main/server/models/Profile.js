const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    bio: {
        type: String,
        default: "",
        trim: true,
        maxlength: 100
    },
    profileUrl: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isActivated: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        default: 'user'
    },
    followers: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            profile: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'profile'
            }
        }
    ],
    following: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            profile: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'profile'
            }
        }
    ],
    viewedBy: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            profile: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'profile'
            }
        }
    ],
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        },
        github: {
            type: String
        }
    },
}, { timestamps: true })

module.exports = mongoose.model('profile', ProfileSchema);
//This Mongoose schema defines the Profile model with fields for user references, bio, profile URL, social media links, interaction lists (followers, following, viewedBy),
// and flags for profile status. It includes automatic timestamps for creation and updates.