const mongoose = require('mongoose');
const Schema = mongoose.Schema;

ProfileSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId,
         ref: 'User'
    },
    handle: {
        type: String,
        required: true
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    githubUserName: {
        type: String
    },
    experience: {
       type: [
           {
               title: {
                   type: String,
                   required: true
               },
               company: {
                   type: String,
                   required: true
               },
                location: {
                   type: String,
                   required: true
               },
               from: {
                   type: Date,
                   required: true
               },
               to: {
                   type: Date
               },
               current: {
                   type: Boolean,
                   default: false
               },
               description: {
                   type: String
               }
           }
       ]
    },
    education: {
        type: [
            {
                school: {
                    type: String,
                    required: true
                },
                degree: {
                    type: String,
                    required: true
                },
                field: {
                    type: String,
                    required: true
                },
                from: {
                    type: Date,
                    required: true
                },
                to: {
                    type: Date
                },
                current: {
                    type: Boolean,
                    default: false
                },
                description: {
                    type: String
                }
            }
        ]
    },
    socials: {
        youtube: {
            type: String
        },
        tweeter: {
            type: String
        },
         facebook: {
            type: String
        },
        linkden: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Profile', ProfileSchema);