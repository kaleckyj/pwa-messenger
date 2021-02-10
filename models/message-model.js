const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema(
    {
      from: String,
      dateTime: String,
      message: String
    }
);

messageSchema.method('toItem', function() {
   var obj = this.toObject();

   //Rename fields
   obj.id = obj._id;
   delete obj._id;

   return obj;
});

const Message = mongoose.model('mssage', messageSchema);
module.exports = Message;