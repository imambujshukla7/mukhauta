const express = require('express');
const router = express.Router();
const Conversation = require('../models/Conversation');

// Get all conversations
router.get('/', async (req, res) => {
  try {
    const conversations = await Conversation.find();
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific conversation by ID
router.get('/:id', getConversation, (req, res) => {
  res.json(res.conversation);
});

// Create a new conversation
router.post('/', async (req, res) => {
  const conversation = new Conversation({
    hashName: req.body.hashName,
    title: req.body.title,
  });

  try {
    const newConversation = await conversation.save();
    res.status(201).json(newConversation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Middleware function to get a conversation by ID
async function getConversation(req, res, next) {
  try {
    const conversation = await Conversation.findById(req.params.id);
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
