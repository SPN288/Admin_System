const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Role = require('./models/Role')
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((error) => console.error('Error connecting to MongoDB Atlas:', error));

// Routes
app.use('/',require("./routes/products"));
app.use('/',require("./routes/user"));
app.use('/',require("./routes/manager"));
app.use('/',require("./routes/admin"));

app.post('/insert', async (req, res) => {
  const { email_id, role } = req.body;

  // Validate role value
  const validRoles = ['user', 'manager', 'admin'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: 'Invalid role. Allowed values: user, manager, admin' });
  }

  try {
    const newRole = new Role({ email_id, role });
    await newRole.save();
    res.status(201).json({ message: 'Data inserted successfully', data: newRole });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate email_id error
      res.status(409).json({ message: 'Email already exists' });
    } else {
      console.error('Error inserting data:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
});

// Example endpoint for login (previously defined)
app.post('/login', async (req, res) => {
  const { email_id, password } = req.body;

  try {
    const user = await Role.findOne({ email_id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const role = user.role;

    if (role === 'user') {
      res.redirect(307, '/loginuser');
    } else if (role === 'manager') {
      res.redirect(307, '/managerlogin');
    } else if (role === 'admin') {
      res.redirect(307, '/adminlogin');
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
