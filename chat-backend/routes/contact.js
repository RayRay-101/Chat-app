const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const upload = require('../config/multerConfig')

//GET all contacts
router.get('/', contactController.getAllContacts);

// GET a single contact
router.get('/:id', contactController.getContactMiddleware, contactController.getContactById);

// POST/create a new contact with file upload
router.post('/', upload.single('profilePicture'), contactController.createContact);

// UPDATE a contact
router.patch('/:id', contactController.getContactMiddleware, upload.single('profilePicture'), contactController.updateContact);

// DELETE a contact
router.delete('/:id', contactController.getContactMiddleware, contactController.deleteContact);


module.exports = router;
