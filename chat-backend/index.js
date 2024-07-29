const express = require('express')
const http = require('http');
const { Server } = require('socket.io')
const cors = require('cors');
const connectDB = require('./config/db')
const Message = require('./models/Message');


const app = express()
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Adjust based on your frontend URL
    methods: ["GET", "POST"]
  }
});

connectDB()

app.use(express.json())
app.use(cors())

app.use('/api/contacts', require('./routes/contact'))
app.use('/api/messages', require('./routes/message'))
app.use('/api/users', require('./routes/user'))


const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

io.on('connection', (socket) => {
  console.log('New user connected')

  socket.on('sendMessage', async (messageData) => {
    const message = new Message(messageData)
    await message.save()
    io.emit('receivemessage', message)
  })

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

})