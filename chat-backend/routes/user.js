const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = require('../config/upload');
const userController = require('../controllers/userController');

// Register a new user with file upload
router.post('/register', upload.single('picture'), userController.registerUser);

// Get all users
router.get('/', userController.getAllUsers);

// Create a new user
router.post('/', userController.createUser);

// Get a single user
router.get('/:id', userController.getUserById, userController.getUser);

// Update a user
router.patch('/:id', userController.getUserById, userController.updateUser);

// Delete a user
router.delete('/:id', userController.getUserById, userController.deleteUser);

// Add the route to retrieve the user's image
router.get('/images/:id', userController.getUserImage);

module.exports = router;
