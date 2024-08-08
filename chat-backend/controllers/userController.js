const User = require('../models/User');

//Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { name, phone } = req.body;
        const picture = req.file ? `/uploads/${req.file.filename}` : null;
        const user = new User({ name, phone, picture });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//GET all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//CREATE a new user
exports.createUser =  async (req, res) => {
    const user = new User(req.body);
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

//GET a single user
exports.getUser = async (req, res) => {
    res.json(res.user);
}

//update a user
exports.updateUser = async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name;
    }
    if (req.body.phone != null) {
        res.user.phone = req.body.phone;
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


//DELETE a user
exports.deleteUser = async (req, res) => {
    try {
        await res.user.remove();
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Middleware to get a user by ID
exports.getUserById = async  (req, res, next) => {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.user = user;
    next();
}
