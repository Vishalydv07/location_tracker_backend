const User = require('../models/user');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllLocations = async (req, res) => {
  try {
    const users = await User.find().select('username locations');
    const locations = users.flatMap(user => user.locations.map(location => ({
      userId: user._id,
      username: user.username,
      latitude: location.latitude,
      longitude: location.longitude,
      timestamp: location.timestamp,
    })));
    res.json(locations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};