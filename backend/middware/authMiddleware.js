const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Protect route (for protected endpoints like reports)
const protect = async (req, res, next) => {
  let token;

  // Check if the token exists in the authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user to the request object
      req.user = await User.findById(decoded.id).select('-password'); // Exclude password from the user info

      // Proceed to the next middleware/handler
      next();
    } catch (error) {
      // If token is invalid or expired
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    // If there's no token in the authorization header
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
