const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token || !token.startsWith('fake-token')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    next();
  };
  
  module.exports = authMiddleware;
  