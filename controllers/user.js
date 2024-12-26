const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  try {
    const { username, password, latitude, longitude } = req.body;
    const user = new User({ username, password, locations: [{ latitude, longitude }] });
    await user.save();

    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password, latitude, longitude } = req.body;
    const user = await User.findOne({ username });
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    // Save login location for non-admin users
    if (user.role !== 'admin') {
      if (!latitude || !longitude) {
        throw new Error('Latitude and longitude are required for non-admin users');
      }
      user.locations.push({ latitude, longitude });
      await user.save();
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, 'secretkey', { expiresIn: '7d' });
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};