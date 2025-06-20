const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    }
    , email: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

    contacts:{
        type: Array,
        default: []
    },

    roomIds:{
        type:Array,
        default: []
    },
    personAndRoom:{
        type: Array,
        default: [],
    },
   

        
    
    groupIds:{
        type: Array,
        default: []
    },
    profilePicture: {
        type: String,
        default: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32" xml:space="preserve"><path d="M16 31C7.729 31 1 24.271 1 16S7.729 1 16 1s15 6.729 15 15-6.729 15-15 15zm0-28C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3z"/><circle cx="16" cy="15.133" r="4.267"/><path d="M16 30c2.401 0 4.66-.606 6.635-1.671-.425-3.229-3.18-5.82-6.635-5.82s-6.21 2.591-6.635 5.82A13.935 13.935 0 0 0 16 30z"/></svg>'
    },
   

})
const userModel = mongoose.model('User', userSchema);
module.exports = userModel;