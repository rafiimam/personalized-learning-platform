const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  email: { type: String, required: true },
  learningPreferences: { type: Array, default: [] },
  goals: { type: String },
  progress: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
