const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/user');
const locationRoutes = require('./routes/loaction');
const adminRoutes = require('./routes/admin');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/admin', adminRoutes);

// Connect to MongoDB
mongoose.connect('mongodb+srv://vy215093:sdh82pHRDiEx5eRO@cluster0.6y8ds.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});