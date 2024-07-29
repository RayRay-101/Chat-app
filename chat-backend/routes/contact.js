// routes/contact.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

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

// POST/create a new contact
router.post('/', async (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber
  });

  try {
    const newContact = await contact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
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

  try {
    const updatedContact = await res.contact.save();
    res.json(updatedContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a contact
// router.delete('/:id', getContact, async (req, res) => {
//   try {
//     await res.contact.remove();
//     res.status(200).send({ message: 'Contact deleted successfully' });
//   } catch (error) {
//     res.status(500).send({ message: 'Internal server error' });
//   }
// });

router.delete('/:id', getContact, async (req, res) => {
  try {
    console.log(`Attempting to delete contact with ID: ${req.params.id}`);
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      console.error('Contact not found');
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
