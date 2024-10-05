const userModel = require('../models/userModel'); 
const jwt = require('jsonwebtoken');

// register user if they don't exist in the json database
const register = (req, res) => {
    const { username, password, email } = req.body;
    const users = userModel.getUsers();

    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({message: "User already exists!"});
    }

    const newUser = {
        id: users.length + 1,
        username,
        password,
        email
    };

    users.push(newUser);
    userModel.saveUsers(users);

    res.status(201).json({ message: "User registered successfully!", user: newUser});
};

// login user with JWT if they exist in the json database
const login = (req, res) => {
    const { username, password } = req.body;
    const users = userModel.getUsers();

    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: "Invalid username or password! "});
    }

    const token = jwt.sign({ id: user.id, username: user.username}, { expiresIn: '15m'});
    res.json({ message: "Login successful!", token});
};

const getProfile = (req, res) => {
    const users = userModel.getUsers();

    const user = users.find(u => u.id === req.user.id);

    if (!user) {
        return res.status(404).json({ message: "User not found! "});
    }

    res.json({ username: user.username, email: user.email});
};
