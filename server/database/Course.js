const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: Array, required: true }, // Array of content/sections
  difficultyLevel: { type: String, default: "beginner" },
  tags: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now }
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
