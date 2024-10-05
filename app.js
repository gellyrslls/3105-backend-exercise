const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');

const app = express();

app.use('/user', userRoutes);
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Server is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
