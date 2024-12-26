module.exports = (req, res, next) => {
  if (req.userRole === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Access denied' });
  }
};