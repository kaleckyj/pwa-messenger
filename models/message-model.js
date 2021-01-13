const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema(
    {
      from: String,
      dateTime: String,
      message: String
    }
);

const Message = mongoose.model('mssage', messageSchema);
module.exports = Message;