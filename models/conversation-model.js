const mongoose = require('mongoose');
const User = require('../models/user-model');
const Message = require('../models/message-model');

const Schema = mongoose.Schema;

const conversationSchema = new Schema(
    {
      id: String,
      members: [String],
      messages: [Object]
    }
);

const Conversation = mongoose.model('conversation', conversationSchema);
module.exports = Conversation;