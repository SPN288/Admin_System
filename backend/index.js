const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

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
app.use('/',require("./routes/user"));
app.use('/',require("./routes/manager"));
app.use('/',require("./routes/admin"));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
