const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');

const app = express();
const port = 3000;

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use(bodyParser.json());

app.use('/user', userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
