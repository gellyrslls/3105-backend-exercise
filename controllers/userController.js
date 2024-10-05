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
      return res.status(400).json({ message: 'Invalid username or password' });
    }
  
    // simulate token generation 
    const token = `fake-token-${user.id}`;
  
    return res.json({ message: 'Login successful', token });
  };

module.exports = { 
    register, 
    login 
};
