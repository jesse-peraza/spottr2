const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    content: {type: String, required: true}
},  {
    timestamps: true
})


module.exports = mongoose.model('Match', matchSchema)