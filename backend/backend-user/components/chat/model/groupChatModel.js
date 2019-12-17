const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = Schema({
    idGroup: {
        type: Schema.Types.ObjectId,
        required: true
    },
    idUser: {
        type: Schema.Types.ObjectId,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now,
        required: true
    }
})

const GroupChatSchema = Schema({
    groupInfo: {
        idUser1: {
            type: Schema.Types.ObjectId,
            required: true
        },
        idUser2: {
            type: Schema.Types.ObjectId,
            required: true
        },
        time : {
            type: Date,
            default: Date.now,
            required: true
        },
        active : {
            type : Boolean,
            default : false,
            require : true
        }
    },
    lastMessage: {
        message: MessageSchema,
        seen: {
            isSeen : {
                type: Boolean,
                default: false,
                required: true
            },
            time : Date,
        }
    }
});


module.exports = { 
        GroupChatModel : mongoose.model('group_chats', GroupChatSchema),
        MessageModel : mongoose.model('messages',MessageSchema)
    }