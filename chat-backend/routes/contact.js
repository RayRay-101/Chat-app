const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const upload = require('../config/upload');

//GET all contacts
router.get('/', contactController.getAllContacts);

// route to retrieve the image
router.get('/images/:id', contactController.getContactImage);

// GET a single contact
router.get('/:id', contactController.getContactMiddleware, contactController.getContactById);

// POST/create a new contact with file upload
router.post('/', upload.single('profilePicture'), contactController.createContact);

// UPDATE a contact
router.patch('/:id', contactController.getContactMiddleware, upload.single('profilePicture'), contactController.updateContact);

// DELETE a contact
router.delete('/:id', contactController.getContactMiddleware, contactController.deleteContact);


module.exports = router;
