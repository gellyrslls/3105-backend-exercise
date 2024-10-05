const userModel = require('../models/userModel'); 

exports.register = (req, res) => {
    const { username, password, email } = req.body;
    const users = userModel.getUsers();

    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: "User already exists" });
    }
};

exports.loginUser = (req, res) => {

};

exports.getUserProfile = (req, res) => {

};
