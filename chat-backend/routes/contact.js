const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const Contact = require('../models/Contact');

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

const upload = multer({ storage: storage });

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single contact
router.get('/:id', getContact, (req, res) => {
  res.json(res.contact);
});

// POST/create a new contact with file upload
router.post('/', upload.single('profilePicture'), async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;
    const picture = req.file ? `/uploads/${req.file.filename}` : '';

    const newContact = new Contact({ name, phoneNumber, picture });
    await newContact.save();

    res.status(201).json(newContact);
  } catch (error) {
    console.error('Error adding contact:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// UPDATE a contact
router.patch('/:id', getContact, async (req, res) => {
  if (req.body.name != null) {
    res.contact.name = req.body.name;
  }
  if (req.body.phoneNumber != null) {
    res.contact.phoneNumber = req.body.phoneNumber;
  }
  if (req.file) {
    res.contact.picture = `/uploads/${req.file.filename}`;
  }

  try {
    const updatedContact = await res.contact.save();
    res.json(updatedContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a contact
router.delete('/:id', getContact, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    console.error('Error deleting contact:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

async function getContact(req, res, next) {
  let contact;
  try {
    contact = await Contact.findById(req.params.id);
    if (contact == null) {
      return res.status(404).json({ message: 'Contact not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.contact = contact;
  next();
}

module.exports = router;
