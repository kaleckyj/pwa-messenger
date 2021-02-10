const PORT = process.env.PORT || 4000

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const server = http.listen(PORT, () => console.log(`Listening on ${PORT}`));

const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors'); 

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", '*');
   res.header("Access-Control-Allow-Credentials", true);
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
   res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
   next();
});

const userRoutes = require('./routes/user-routes');
const loginRoutes = require('./routes/login-routes');
const conversationRoutes = require('./routes/conversation-routes');
const Conversation = require('./models/conversation-model');
const conversationController = require('./controllers/conversation-controller');

// MongoDB
mongoose.set("debug", true);
mongoose.connect('mongodb+srv://admin:pwa@cluster0.ce5om.mongodb.net/PWA-Messenger?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
   //console.log('connected to mongodb');
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// CORS
app.use(cors());

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
/*app.use('/addconv', conversationController.manualAddConvToDB);
app.use('/adduser', conversationController.manualAddUserToDB);*/

// create home route
app.get('/', conversationController.getConvs);

// Socket.io setup
io.on('connection', (socket) => {
   //console.log('socket connection established ', socket.id);

   socket.on('disconnect', () => console.log('Client disconnected', socket.id));

   socket.on('message', (message) => {    //handle receiving and sending messages
      //console.log(message);
      socket.broadcast.emit("message", message);
   });

});