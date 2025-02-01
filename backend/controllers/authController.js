const authService = require('../services/authService');

// Register new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const { user, token } = await authService.registerUser(name, email, password);
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token
    });
  } catch (error) {
    res.status(400).json({ 
        success: false, 
        error: error.message || 'Something went wrong, please try again.' 
    });
}
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await authService.loginUser(email, password);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Change password
const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await authService.changePassword(req.user._id, oldPassword, newPassword);
    res.status(200).json({ message: 'Password updated successfully', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get user profile (protected)
const getUserProfile = async (req, res) => {
  try {
    const user = await authService.getUserProfile(req.user._id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update user profile (protected)
const updateUserProfile = async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await authService.updateUserProfile(req.user._id, name, email);
    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, changePassword, getUserProfile, updateUserProfile };
