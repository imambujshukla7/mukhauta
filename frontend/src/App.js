import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConversationForm from './components/ConversationForm';
import CommentList from './components/CommentList';
import CommentForm from './components/CommentForm';

const App = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  useEffect(() => {
    
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const response = await axios.get('/api/conversations');
      setConversations(response.data);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const handleConversationSubmit = async (newConversation) => {
    try {
      const response = await axios.post('/api/conversations', newConversation);
      setConversations([...conversations, response.data]);
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };

  const handleCommentSubmit = async (newComment) => {
    if (!selectedConversation) {
      console.error('No conversation selected.');
      return;
    }

    try {
      const response = await axios.post(`/api/comments/conversation/${selectedConversation._id}`, newComment);
      const updatedConversation = { ...selectedConversation, comments: [...selectedConversation.comments, response.data] };
      setConversations(conversations.map(conv => (conv._id === selectedConversation._id ? updatedConversation : conv)));
      setSelectedConversation(updatedConversation);
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);
  };

  return (
    <div>
      <h1>Mukhauta</h1>
      <ConversationForm onConversationSubmit={handleConversationSubmit} />
      <hr />

      <div>
        <h2>Conversations</h2>
        <ul>
          {conversations.map((conversation) => (
            <li key={conversation._id} onClick={() => handleConversationSelect(conversation)}>
              {conversation.title}
            </li>
          ))}
        </ul>
      </div>

      {selectedConversation && (
        <div>
          <h2>Selected Conversation: {selectedConversation.title}</h2>
          <CommentList comments={selectedConversation.comments} />
          <CommentForm onCommentSubmit={handleCommentSubmit} />
        </div>
      )}
    </div>
  );
};

export default App;
