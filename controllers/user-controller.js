const User = require('../models/user-model');

exports.getUsers = function(req, res, next) {   
    
   User.find({}, 'id name')
      .exec(function (err, userList) {
         if (err) { return next(err); }

         res.setHeader('Content-Type', 'application/json');
         res.send(JSON.stringify(userList, null, 3));         
   });
}

exports.getUser = function(req, res, next) {   
    
   User.findOne({id: req.params.id}, 'id name').exec(function (err, foundUser) {
      if (err) { return next(err); }

      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(foundUser, null, 3)); 
   });       
}

//POST
exports.login = function(req, res, next) {
   User.findOne({name: req.body.name}, 'id name').exec(function (err, foundUser) {
      if (err) { return next(err); }

      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(foundUser, null, 3)); 
   });  
}
