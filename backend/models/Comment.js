// mukhauta/backend/models/Comment.js
const mongoose = require('mongoose');

// Define Comment Schema
const commentSchema = new mongoose.Schema({
  hashName: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
