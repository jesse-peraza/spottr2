const mongoose = require('mongoose')
const Schema = mongoose.Schema
  
const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        default: null,
    },
    age: {
        type: Number,
        default: null
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true,
    },
    photos: [{type: String, default: null}],
    about: {type: String},
    fitnessGoal: {
        type: String,
        enum: ['Figuring it out!', 'Training for functionality', 'Getting stronger', 
        'Getting big', 'Getting lean', 'Endurance']
    },
    fitnessStyle: {
        type: String,
        enum: ['Running', 'Bodybuilding', 'Powerlifting', 'Cross-Training', 'All around']
    },
    fitnessLevel: {
        type: String,
        enum: ['Getting started', 'Novice', '1-3 years experience', '3+ years experience']
    },
    schedule: {
        type: String,
        enum: ['M', 'T', 'W', 'Th', 'F', 'evenings', 'mornings']
    },
    minAgePreference: {
        type: Number,
        default: 21
      },
    maxAgePreference: {
        type: Number,
        default: 99
      },
    genderPreference: {
        type: String,
        enum: ['male', 'female', 'other']
      },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    matches: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Match'
    }] 
}, {
    timestamps: true,
})


  module.exports = mongoose.model('Profile', profileSchema)