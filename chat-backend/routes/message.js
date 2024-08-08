const router = require('express').Router()
const messageController = require('../controllers/messageController')

// GET all messages between two users
router.get('/:sender/:receiver', messageController.getMessagesBtnUsers);

// POST a new message
router.post('/', messageController.createMessage)

module.exports = router
