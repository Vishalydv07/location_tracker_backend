
const User = require('../models/user');

exports.addLocation = async (req, res) => {
  try {
    const userId = req.userId;
    const { latitude, longitude } = req.body;
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    user.locations.push({ latitude, longitude });
    await user.save();

    res.status(201).json({ message: 'Location saved' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};