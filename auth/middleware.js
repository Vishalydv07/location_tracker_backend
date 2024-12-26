const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Format: "Bearer <token>"
    const decoded = jwt.verify(token, 'secretkey');
    req.userId = decoded.userId;
    req.userRole = decoded.role; // Add this line
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};