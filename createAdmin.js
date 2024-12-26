const mongoose = require('mongoose');
const User = require('./models/user');

mongoose.connect('mongodb+srv://vy215093:sdh82pHRDiEx5eRO@cluster0.6y8ds.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  const adminExists = await User.findOne({ username: 'admin' });
  if (!adminExists) {
    const admin = new User({
      username: 'admin',
      password: 'adminpassword',
      role: 'admin',
    });
    await admin.save();
    console.log('Admin user created');
  } else {
    console.log('Admin user already exists');
  }
  mongoose.disconnect();
})
.catch((err) => console.error(err));