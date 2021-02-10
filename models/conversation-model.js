const mongoose = require('mongoose');
const User = require('../models/user-model');
const Message = require('../models/message-model');

const Schema = mongoose.Schema;

const conversationSchema = new Schema(
    {
      members: [String],
      messages: [Object]
    }
);

conversationSchema.method('toItem', function() {
   var obj = this.toObject();

   //Rename fields
   obj.id = obj._id;
   delete obj._id;

   return obj;
});

const Conversation = mongoose.model('conversation', conversationSchema);
module.exports = Conversation;