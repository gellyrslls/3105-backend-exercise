const { getUsers, saveUsers } = require('../models/userModel');

// register user if they don't exist in the json database
const register = (req, res) => {
  const { username, password, email } = req.body;

  const users = getUsers();
  const userExists = users.find((user) => user.username === username);

  if (userExists) {
    return res.status(400).json({ message: 'Username already exists!' });
  }

  const newUser = {
    id: users.length + 1,
    username,
    password, 
    email
  };

  users.push(newUser);
  saveUsers(users);

  return res.status(201).json({ message: 'User registered successfully!' });
};

// login user if they exist in the json database
const login = (req, res) => {
    const { username, password } = req.body;
  
    const users = getUsers();
    const user = users.find((u) => u.username === username && u.password === password);
  
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password!' });
    }
  
    // simulate token generation 
    const token = `fake-token-${user.id}`;
  
    return res.json({ message: 'Login successful!', token });
  };

  // shows user information
  const getProfile = (req, res) => {
    const token = req.headers['authorization'];
    const userId = token.split('-').pop(); 
  
    const users = getUsers();
    const user = users.find((u) => u.id === parseInt(userId));
  
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }
  
    return res.json({ username: user.username, email: user.email });
  };

module.exports = { 
    register, 
    login,
    getProfile
};
