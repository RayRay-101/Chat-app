const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const Message = require('./models/Message');
const User = require('./models/User'); 
const Contact = require('./models/Contact'); 

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  }
});

connectDB();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/contacts', require('./routes/contact'));
app.use('/api/messages', require('./routes/message'));
app.use('/api/users', require('./routes/user'));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('sendMessage', async (messageData) => {
    try {
      const message = new Message(messageData);
      await message.save();

      // Emit the message to the sender
      socket.emit('receivemessage', message);
      
      // Broadcast the message to all other clients
      socket.broadcast.emit('receivemessage', message);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
