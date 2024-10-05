const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const loggerMiddleware = require('./middleware/loggerMiddleware');
const rateLimiter = require('./middleware/limiterMiddleware');

const app = express();

app.use(bodyParser.json());
app.use(loggerMiddleware);
app.use(rateLimiter);

app.use('/user', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
