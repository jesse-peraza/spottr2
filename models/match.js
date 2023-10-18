const mongoose = require('mongoose')
const Schema = mongoose.Schema

const matchSchema = new Schema({
    userA: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userB: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    matchDate: {
        type: Date,
        default: Date.now
    }  
},  {
    timestamps: true
})


module.exports = mongoose.model('Match', matchSchema)