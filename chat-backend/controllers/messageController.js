const Message = require('../models/Message');
const Contact = require('../models/Contact');

exports.getMessagesBtnUsers = async (req, res) => {
  try {
    const { sender, receiver } = req.params;
    const messages = await Message.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender }
      ]
    }).sort({ timestamp: -1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.createMessage = async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();

    // Update the last message and time in the Contact schema
    await Contact.updateOne(
      { _id: req.body.sender },
      { lastMessage: req.body.content, lastMessageTime: new Date() }
    );

    await Contact.updateOne(
      { _id: req.body.receiver },
      { lastMessage: req.body.content, lastMessageTime: new Date() }
    );

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
