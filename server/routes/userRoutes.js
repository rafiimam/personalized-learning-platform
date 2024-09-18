// /server/routes/userRoutes.js
const auth = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
const { check, validationResult } = require('express-validator');
const User = require('../database/User'); // Make sure the path to the User model is correct



// Register a user
router.post(
    '/register',
    [
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      registerUser(req, res);
    }
  );
  
  // Login a user with validation
  router.post(
    '/login',
    [
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Password is required').exists(),
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      loginUser(req, res);
    }
  );

router.get('/profile', auth, (req, res) => {
    res.json({ msg: 'User profile', user: req.user });
  });

  // Update user preferences
// Update user preferences
router.put('/preferences', auth, async (req, res) => {
    const { learningPreferences, goals } = req.body;
  
    try {
      // Ensure req.user exists and contains the correct id
      if (!req.user || !req.user.id) {
        return res.status(401).json({ msg: 'No user ID found in token' });
      }
  
      // Find user by ID
      let user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      // Update user preferences
      user.learningPreferences = learningPreferences || user.learningPreferences;
      user.goals = goals || user.goals;
      await user.save();
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  

module.exports = router;
