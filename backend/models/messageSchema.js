const mongoose = require('mongoose')
const {Schema} = mongoose

const messageSchema = new Schema({
    message:{
        type:String,
        
    },
    sendBy:{
        type:String,
        
    },
    roomId:{
        type:String,
        

    },
    sendTo:{
        type:String,
        

    },
   createdAt: {
        type: Date,
        default: Date.now
    },
})

const messageModel = mongoose.model('Message', messageSchema)
module.exports = messageModel