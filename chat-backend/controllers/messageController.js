const Message = require('../models/Message')

//GET messages btn two users
exports.getMessagesBtnUsers =  async (req, res) => {
    try {
      const { sender, receiver } = req.params;
      const messages = await Message.find({
        $or: [
          { sender, receiver },
          { sender: receiver, receiver: sender }
        ]
      }).sort({ timestamp: -1 }); // Sort by timestamp descending
  
      res.json(messages);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

//CREATE a new message
exports.createMessage = async (req, res) => {
    try {
        const newMessage = new Message(req.body)
        await newMessage.save()
        res.status(201).send(newMessage)
    } catch (error) {
        res.status(400).send(error)
    }

}
