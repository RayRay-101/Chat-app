const multer = require('multer');
const storage = multer.memoryStorage();
const Contact = require('../models/Contact');
const fs = require('fs');
const mongoose = require('mongoose');


// Use the global gridFSBucket
const gridFSBucket = global.gridFSBucket;

// GET all contacts
exports.getAllContacts = async (req, res) => {
  try {
    const userId = req.query.userId;
    const contacts = await Contact.find({ user: user._id });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET a single contact
exports.getContactById = (req, res) => {
  res.json(res.contact);
};

// POST/create a new contact with file upload
exports.createContact = async (req, res) => {
  try {
    const { name, phoneNumber, userId  } = req.body;
    let pictureId = null;

    // Handle picture upload using GridFS
    if (req.file && global.gridFSBucket) {
      console.log('Uploading file to GridFS...'); // Debugging line

      if (req.file && !global.gridFSBucket) {
        return res.status(500).json({ message: 'GridFS is not properly initialized' });
      }
     

      const uploadStream = global.gridFSBucket.openUploadStream(req.file.originalname, {
        contentType: req.file.mimetype,
      });

      await new Promise((resolve, reject) => {
        uploadStream.end(req.file.buffer, (err) => {
          if (err) {
            console.error('Error during file upload:', err); // Debugging line
            return reject(err);
          }
          pictureId = uploadStream.id;
          resolve();
        });
      });
    }

    const newContact = await Contact.create({ 
      name, phoneNumber, picture: pictureId, user: userId });
    res.status(201).json(newContact);
  } catch (error) {
    console.error('Error adding contact:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// UPDATE a contact
exports.updateContact = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid contact ID' });
  }

  const updates = { name: req.body.name, phoneNumber: req.body.phoneNumber };

  // Handle picture update using GridFS
  if (req.file) {
    const uploadStream = gridFSBucket.openUploadStream(req.file.originalname);
    await new Promise((resolve, reject) => {
      uploadStream.end(req.file.buffer, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
    updates.picture = uploadStream.id;
  }

  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, updates, { new: true });
    res.json(updatedContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE a contact
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    if (contact.picture && global.gridFSBucket) {
      await global.gridFSBucket.delete(new mongoose.Types.ObjectId(contact.picture));
    }
    
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    console.error('Error deleting contact:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Middleware to get a contact by ID
exports.getContactMiddleware = async (req, res, next) => {
  try {
    res.contact = await Contact.findById(req.params.id);
    if (!res.contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/// GET the image from GridFS by picture ID
exports.getContactImage = async (req, res) => {
  const { id } = req.params;

  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid image ID' });
  }

  // Check if gridFSBucket is available
  if (!global.gridFSBucket) {
    console.error('GridFSBucket is not initialized');
    return res.status(500).json({ message: 'Server is not ready. Please try again later.' });
  }

  try {
    // Create a download stream from GridFS
    const downloadStream = global.gridFSBucket.openDownloadStream(new mongoose.Types.ObjectId(id));

    // Set the appropriate content type
    res.set('Content-Type', 'image/jpeg');

    // Pipe the image data to the response
    downloadStream.pipe(res);

    downloadStream.on('error', (err) => {
      console.error('Error fetching image:', err);
      if (!res.headersSent) {
        res.status(404).json({ message: 'Image not found' });
      }
    });

    downloadStream.on('end', () => {
      if (!res.headersSent) {
        res.end();
      }
    });
  } catch (error) {
    console.error('Error retrieving image:', error);
    if (!res.headersSent) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};