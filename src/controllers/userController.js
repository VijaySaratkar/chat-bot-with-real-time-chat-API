import User from '../models/User.js';

// @desc    Get all users (excluding passwords)
// @route   GET /api/users
// @access  Private
export const getAllUsers = async (req, res) => {
  try {
    // Fetch only id, name, email
    const users = await User.find({}, '_id name email').sort({ name: 1 });
    res.json(users);
  } catch (err) {
    console.error('GetAllUsers error:', err);
    res.status(500).json({ message: 'Error fetching users' });
  }
};
