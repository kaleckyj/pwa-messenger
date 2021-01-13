const Conversation = require('../models/conversation-model');

exports.getConvs = function(req, res, next) {   
   var userId = req.baseUrl.replace("/users/", "").replace("/conversations", "");
   Conversation.find({members: { "$in" : [userId]}}, 'id members messages')
      .exec(function (err, convs) {
         if (err) { return next(err); }
         console.log(req);

         res.setHeader('Content-Type', 'application/json');
         res.send(JSON.stringify(convs, null, 3));         
   });
}

exports.getConv = function(req, res, next) {   
    
   Conversation.findOne({id: req.params.id}).exec(function (err, conv) {
      if (err) { return next(err); }

      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(conv, null, 3)); 
   });       
}

//POST
exports.createConv = [   
   (req, res, next) => {
      const newConv = new Conversation({ 
         members: req.body.members,
         messages: []
      });
      if (!errors.isEmpty()) {
         return;
      } else {
         newConv.save(function (err) {
            if (err) { return next(err, savedConv); }
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(newConv, null, 3)); 
         });
      }
   }
];

// edit a conversation (add a message) (POST)
exports.editConv = [   
   (req, res, next) => {
      const msg = new Message({ 
         from: req.body.from,
         dateTime: req.body.dateTime,
         message: req.params.message
      });
      if (!errors.isEmpty()) {
         return;
      } else {
         Conversation.findByIdAndUpdate(req.body.id, {$addToSet: {messages: msg}}, function (err, editedConv) {
            if (err) { return next(err); }

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(editedConv, null, 3)); 
         });
      }
   }
];

/* to add data to db manually*/
exports.manualAddConvToDB = function(req, res, next) {   
   new Conversation({
      id: "1",
      members: ["1","2","3"],
      messages: [{from: "Honza", dateTime: "2. 1. 2021 15:42:07", message: "Ahoj jak se mate?"}, {from: "Petr", dateTime: "2. 1. 2021 15:45:15", message: "Cus ja se mam dobre"}]
   }).save().then((newConv) => {
      console.log('created new conv: ', newConv);
      done(null, newConv);
   });    
   new Conversation({
      id: "2",
      members: ["1","3"],
      messages: [{from: "Honza", dateTime: "2. 1. 2021 15:42:07", message: "Ahoj"}, {from: "Honza", dateTime: "2. 1. 2021 15:45:15", message: "Jak se mas?"}]
   }).save().then((newConv) => {
      console.log('created new conv: ', newConv);
      done(null, newConv);
   });    
}

const User = require('../models/user-model');

exports.manualAddUserToDB = function(req, res, next) {   
   new User({
      id: "1",
      name: "Honza",
      password: "1234"
   }).save().then((newUser) => {
      console.log('created new conv: ', newUser);
      done(null, newUser);
   });    
   new User({
      id: "2",
      name: "Petr",
      password: "1234"
   }).save().then((newUser) => {
      console.log('created new conv: ', newUser);
      done(null, newUser);
   });    
   new User({
      id: "3",
      name: "Tereza",
      password: "1234"
   }).save().then((newUser) => {
      console.log('created new conv: ', newUser);
      done(null, newUser);
   });    
}/**/