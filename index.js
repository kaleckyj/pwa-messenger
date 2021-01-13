const express = require('express');
const socket = require('socket.io');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const http = require ('http');
const cors = require('cors');

const PORT = process.env.PORT || 4000

const userRoutes = require('./routes/user-routes');
const loginRoutes = require('./routes/login-routes');
const conversationRoutes = require('./routes/conversation-routes');
const Conversation = require('./models/conversation-model');
const conversationController = require('./controllers/conversation-controller');

// App setup
const app = express();
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

// CORS
app.use(cors());

// MongoDB
//mongoose.set("debug", true);
mongoose.connect('mongodb+srv://admin:pwa@cluster0.ce5om.mongodb.net/PWA-Messenger?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
   console.log('connected to mongodb');
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// use parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// use helmet - safe headers
app.use(helmet());

// set routes
app.use('/login', loginRoutes);
app.use('/users', userRoutes);
app.use('/users/:id/conversations', conversationRoutes);

/*manual add*/
app.use('/addconv', conversationController.manualAddConvToDB);
app.use('/adduser', conversationController.manualAddUserToDB);/**/

// create home route
app.get('/', conversationController.getConvs);

// Socket.io setup
const io = socket(server);

io.on('connection', (socket) => {
   console.log('socket connection established ', socket.id);

   socket.on('disconnect', () => console.log('Client disconnected', socket.id));

   socket.on('message', (message) => {    //handle sending messages
      io.emit(message);
   });

});