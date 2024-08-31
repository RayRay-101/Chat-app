const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const Message = require('./models/Message');
const Contact = require('./models/Contact');


const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  'http://localhost:5173',
  'https://chat-app-plum-nu.vercel.app',
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
};

const io = new Server(server, {
  cors: corsOptions,
})

connectDB()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options('*', cors());

app.use(cors(corsOptions));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/contacts', require('./routes/contact'));
app.use('/api/messages', require('./routes/message'));
app.use('/api/users', require('./routes/user'));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

io.on('connection', (socket) => {
  socket.on('sendMessage', async (messageData) => {
    try {
      const message = new Message(messageData);
      await message.save();

      // Find the contact document by name to get the ObjectId
      const contact = await Contact.findOne({ name: messageData.receiver });

      if (contact) {
        await Contact.findByIdAndUpdate(contact._id, {
          lastMessage: message.content,
          lastMessageTime: message.timestamp,
        });
      }

      socket.emit('receivemessage', message);
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

