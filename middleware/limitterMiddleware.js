let requestCounts = {};
const WINDOW_SIZE = 30; 
const MAX_REQUESTS = 5;

const rateLimiter = (req, res, next) => {
  const userIP = req.ip;

  if (!requestCounts[userIP]) {
    requestCounts[userIP] = { count: 1, startTime: Date.now() };
  } else {
    const currentTime = Date.now();
    const elapsedTime = (currentTime - requestCounts[userIP].startTime) / 1000;

    if (elapsedTime > WINDOW_SIZE) {
      // reset counter after window passes
      requestCounts[userIP] = { count: 1, startTime: currentTime };
    } else {
      requestCounts[userIP].count += 1;
    }
  }

  if (requestCounts[userIP].count > MAX_REQUESTS) {
    return res.status(429).json({ message: 'Too many requests, please try again later.' });
  }

  next();
};

module.exports = rateLimiter;
