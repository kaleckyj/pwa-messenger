const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
      name: String,
      password: String
    }
);

userSchema.method('toItem', function() {
   var obj = this.toObject();

   //Rename fields
   obj.id = obj._id;
   delete obj._id;

   return obj;
});

const User = mongoose.model('user', userSchema);
module.exports = User;