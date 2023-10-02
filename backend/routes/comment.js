const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const Conversation = require('../models/Conversation');

// Get all comments for a specific conversation
router.get('/conversation/:conversationId', getConversation, async (req, res) => {
  res.json(res.conversation.comments);
});

// Add a new comment to a conversation
router.post('/conversation/:conversationId', getConversation, async (req, res) => {
  const comment = new Comment({
    hashName: req.body.hashName,
    content: req.body.content,
  });

  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);

    res.conversation.comments.push(newComment._id);
    await res.conversation.save();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Middleware function to get a conversation by ID
async function getConversation(req, res, next) {
  try {
    const conversation = await Conversation.findById(req.params.conversationId).populate('comments');
    if (conversation == null) {
      return res.status(404).json({ message: 'Conversation not found' });
    }
    res.conversation = conversation;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;
