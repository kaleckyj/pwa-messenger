const User = require('../models/user-model');

exports.getUsers = function(req, res, next) {   
    
   User.find({}, 'id name')
      .exec(function (err, userList) {
         if (err) { return next(err); }

         for (let i = 0; i < userList.length; i++) {
            if (userList[i] != null) userList[i]  = userList[i].toItem();            
         }
         res.setHeader('Content-Type', 'application/json');
         res.send(JSON.stringify(userList, null, 3));         
   });
}

exports.getUser = function(req, res, next) {   
    
   User.findById(req.params.id, 'id name').exec(function (err, foundUser) {
      if (err) { return next(err); }
      
      if (foundUser != null) {
         res.setHeader('Content-Type', 'application/json');
         res.send(JSON.stringify(foundUser.toItem(), null, 3)); 
      }
   });       
}

//POST
exports.login = function(req, res, next) {
   User.findOne({name: req.body.name, password: req.body.password}, 'id name').exec(function (err, foundUser) {
      if (err) { return next(err); }

      if (foundUser != null) {
         res.setHeader('Content-Type', 'application/json');
         res.send(JSON.stringify(foundUser.toItem(), null, 3)); 
      }
   });  
}