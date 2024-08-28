const User = require('../models/User');
const mongoose = require('mongoose');
const multer = require('multer');

// Use memory storage for multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Get the GridFSBucket instance
const gridFSBucket = global.gridFSBucket;

// REGISTER a new user
exports.registerUser = async (req, res) => {
  if (!global.gridFSBucket) {
    console.error('GridFSBucket not initialized');
    return res.status(500).json({ error: 'GridFSBucket is not initialized' });
  }

  try {
    const { name, phone } = req.body;
    let pictureId = null;

    console.log('Received registration request:', req.body);

    if (req.file) {
      console.log('File received:', req.file);

      const uploadStream = global.gridFSBucket.openUploadStream(req.file.originalname, {
        contentType: req.file.mimetype,
      });

      await new Promise((resolve, reject) => {
        uploadStream.on('error', (error) => {
          console.error('File upload error:', error);
          reject(error);
        });

        uploadStream.on('finish', () => {
          pictureId = uploadStream.id;
          resolve();
        });

        uploadStream.end(req.file.buffer);
      });
    } else {
      console.log('No file uploaded');
    }

    const user = new User({ name, phoneNumber: phone, picture: pictureId });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// GET all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE a new user (alternative to registerUser if needed)
exports.createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET a single user
exports.getUser = async (req, res) => {
  res.json(res.user);
};

// UPDATE a user
exports.updateUser = async (req, res) => {
  const updates = {};
  if (req.body.name != null) {
    updates.name = req.body.name;
  }
  if (req.body.phone != null) {
    updates.phoneNumber = req.body.phone;
  }

  // Handle picture update using GridFS
  if (req.file && gridFSBucket) {
    try {
      const uploadStream = gridFSBucket.openUploadStream(req.file.originalname, {
        contentType: req.file.mimetype,
      });

      await new Promise((resolve, reject) => {
        uploadStream.end(req.file.buffer, (err) => {
          if (err) return reject(err);
          updates.picture = uploadStream.id;
          resolve();
        });
      });
    } catch (error) {
      console.error('File upload error:', error);
      return res.status(500).json({ error: 'File upload failed' });
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(res.user._id, updates, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(res.user._id);
    if (user && user.picture && gridFSBucket) {
      await gridFSBucket.delete(user.picture);
    }
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Middleware to get a user by ID
exports.getUserById = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    res.user = await User.findById(req.params.id);
    if (!res.user) {
      return res.status(404).json({ message: 'User not found' });
    }
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// GET the image from GridFS by picture ID
exports.getUserImage = async (req, res) => {
  const { id } = req.params;

  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid image ID' });
  }

  if (!gridFSBucket) {
    console.error('GridFSBucket is not initialized');
    return res.status(500).json({ message: 'Server is not ready. Please try again later.' });
  }

  try {
    const downloadStream = gridFSBucket.openDownloadStream(new mongoose.Types.ObjectId(id));

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
