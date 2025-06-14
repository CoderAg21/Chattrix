const mongoose = require('mongoose');
const {Schema} = mongoose
const roomSchema = new Schema({
    participants:{
        type:Array,
        required:true
    },
    createdAt:{
         type: Date,
        default: Date.now
    }
})

const roomModel = mongoose.model("room",roomSchema)
module.exports = roomModel