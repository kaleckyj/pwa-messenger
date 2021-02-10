const Conversation = require('../models/conversation-model');
const Message = require('../models/message-model');

exports.getConvs = function(req, res, next) {   
   var userId = req.baseUrl.replace("/users/", "").replace("/conversations", "");
   Conversation.find({members: { "$in" : [userId]}}, 'id members messages')
      .exec(function (err, convs) {
         if (err) { return next(err); }
         //console.log(req);

         for (let i = 0; i < convs.length; i++) {
            if (convs[i] != null) convs[i]  = convs[i].toItem();            
         }
         res.setHeader('Content-Type', 'application/json');
         res.send(JSON.stringify(convs, null, 3));           
   });
}

exports.getConv = function(req, res, next) {   
    
   Conversation.findById(req.params.id).exec(function (err, conv) {
      if (err) { return next(err); }

      if (conv != null) {
         res.setHeader('Content-Type', 'application/json');
         res.send(JSON.stringify(conv.toItem(), null, 3)); 
      }
   });       
}

//POST create a conversation
exports.createConv = [   
   (req, res, next) => {
      Conversation.find({members: req.body.members}, 'id').exec(function (err, foundConv) {
         if (err) { return next(err); }

         if (foundConv.length <= 0) {      
            const newConv = new Conversation({ 
               members: req.body.members,
               messages: []
            });
            newConv.save(function (err) {
               if (err) { return next(err, savedConv); }
      
               if (newConv != null) {
                  res.setHeader('Content-Type', 'application/json');
                  res.send(JSON.stringify(newConv.toItem(), null, 3)); 
               }
            });
         } else {
            res.send(null); 
         }
      });    
      
   }
];

// edit a conversation (add a message) (POST)
exports.editConv = [   
   (req, res, next) => {
      const msg = new Message({ 
         from: req.body.from,
         dateTime: req.body.dateTime,
         message: req.body.message
      });
      Conversation.findByIdAndUpdate(req.body.id, {$addToSet: {messages: msg}}, function (err, editedConv) {
         if (err) { return next(err); }

         if (editedConv != null) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(editedConv.toItem(), null, 3)); 
         }
      });
   }
];

/* to add data to db manually*/
/*exports.manualAddConvToDB = function(req, res, next) {   
   new Conversation({
      members: ["60234ffbf0e98e3ce46bca9b","60234ffbf0e98e3ce46bca9c","60234ffbf0e98e3ce46bca9d"],
      messages: [{from: "Honza", dateTime: "2. 1. 2021 15:42:07", message: "Ahoj jak se mate?"}, {from: "Petr", dateTime: "2. 1. 2021 15:45:15", message: "Cus ja se mam dobre"}]
   }).save().then((newConv) => {
      console.log('created new conv: ', newConv);
      done(null, newConv);
   });    
   new Conversation({
      members: ["60234ffbf0e98e3ce46bca9b","360234ffbf0e98e3ce46bca9d"],
      messages: [{from: "Honza", dateTime: "2. 1. 2021 15:42:07", message: "Ahoj"}, {from: "Honza", dateTime: "2. 1. 2021 15:45:15", message: "Jak se mas?"}]
   }).save().then((newConv) => {
      console.log('created new conv: ', newConv);
      done(null, newConv);
   });    
}

const User = require('../models/user-model');

exports.manualAddUserToDB = function(req, res, next) {   
   new User({
      name: "Honza",
      password: "1234"
   }).save().then((newUser) => {
      console.log('created new conv: ', newUser);
      done(null, newUser);
   });    
   new User({
      name: "Petr",
      password: "1234"
   }).save().then((newUser) => {
      console.log('created new conv: ', newUser);
      done(null, newUser);
   });    
   new User({
      name: "Tereza",
      password: "1234"
   }).save().then((newUser) => {
      console.log('created new conv: ', newUser);
      done(null, newUser);
   });       
   new User({
      name: "Martin",
      password: "1234"
   }).save().then((newUser) => {
      console.log('created new conv: ', newUser);
      done(null, newUser);
   });       
   new User({
      name: "Petra",
      password: "1234"
   }).save().then((newUser) => {
      console.log('created new conv: ', newUser);
      done(null, newUser);
   });    
}*/