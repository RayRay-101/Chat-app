const router = require('express').Router()
const Message = require('../models/Message')

router.get('/', async (req, res) => {
    try {
        const messages = await Message.find()
        res.json(messages)
    } catch (error) {
        res.status(500).send(error)
    }
 })


router.post('/', async (req, res) => {
    try {
        const newMessage = new Message(req.body)
        await newMessage.save()
        res.status(201).send(newMessage)
    } catch (error) {
        res.status(400).send(error)
    }

})

module.exports = router
