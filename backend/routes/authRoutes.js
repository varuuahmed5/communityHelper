const express = require('express');
const {
  createReport,
  getReports,
  getReportById,
  updateReport,
  deleteReport,
} = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Make sure this path is correct
;

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password with hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT Token
    const token = jwt.sign({ userId: user._id }, 'yourSecretKey', { expiresIn: '1h' });

    // Respond with token
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

// Register a new user

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Make sure this path is correct

// Register Route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    // Save the new user to the database
    await newUser.save();

    // Create JWT Token
    const token = jwt.sign({ userId: newUser._id }, 'yourSecretKey', { expiresIn: '1h' });

    // Respond with token
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;




// Create a new report (protected route)
router.post('/', protect, async (req, res) => {
  try {
    await createReport(req, res); // Call controller function
  } catch (error) {
    res.status(500).json({ message: 'Error creating the report.' });
  }
});

// Get all reports (protected route)
router.get('/', protect, async (req, res) => {
  try {
    await getReports(req, res); // Call controller function
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reports.' });
  }
});

// Get a single report by ID (protected route)
router.get('/:id', protect, async (req, res) => {
  try {
    await getReportById(req, res); // Call controller function
  } catch (error) {
    res.status(500).json({ message: 'Error fetching the report.' });
  }
});

// Update a report by ID (protected route)
router.put('/:id', protect, async (req, res) => {
  try {
    await updateReport(req, res); // Call controller function
  } catch (error) {
    res.status(500).json({ message: 'Error updating the report.' });
  }
});

// Delete a report by ID (protected route)
router.delete('/:id', protect, async (req, res) => {
  try {
    await deleteReport(req, res); // Call controller function
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the report.' });
  }
});

module.exports = router;



const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]; // Token-ka waxaa laga helaa Authorization header
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Xaqiiji Token
    req.user = decoded; // Ugu yeer isticmaalaha
    next(); // Gudub si loo sameeyo queryga
  } catch (error) {
    res.status(401).json({ message: 'Not authorized' });
  }
};

module.exports = { protect };

