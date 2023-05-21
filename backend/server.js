const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const path = require('path');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
// const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// routes
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRouters');
const messageRountes = require('./routes/messageRoutes');
connectDB();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());

// app.get('/', (req, res) => {
//   res.send('API is Running');
// });

// request routes
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRountes);

// ==========================================for deployment code========================
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname1, '/build')));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname1, 'build', 'index.html')));
} else {
  app.get('/', (req, res) => {
    res.send('API is running..');
  });
}
// ==========================================for deployment code========================
//error handler
app.use(notFound);
app.use(errorHandler);

const server = app.listen(PORT, console.log(`Server is running at port ${PORT}`));

const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000',
    // credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('Connected to socket.io');
  socket.on('setup', (userData) => {
    socket.join(userData._id);
    console.log(userData._id);
    socket.emit('connected');
  });

  socket.on('join chat', (room) => {
    socket.join(room);
    console.log('User Joined Room: ' + room);
  });

  socket.on('new message', (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log('chat.users not defined');

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit('message recieved', newMessageRecieved);
    });
  });

  // socket for typing
  socket.on('typing', (room) => socket.in(room).emit('typing'));
  socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

  // socket for disconnected
  socket.off('setup', () => {
    console.log('USER DISCONNECTED');
    socket.leave(userData._id);
  });
});
