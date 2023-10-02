import React, { useState } from 'react';
import shortid from 'shortid'; // Import shortid library

const ConversationForm = ({ onConversationSubmit }) => {
  const [title, setTitle] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const generateHashName = () => {
    // Generated a short, unique hash using the shortid library
    return shortid.generate();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // hashName generated using the generateHashName function
    const hashName = generateHashName();

    onConversationSubmit({ hashName, title });

    setTitle('');
  };

  return (
    <div>
      <h2>Start a New Conversation</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={handleTitleChange} required />
        </label>
        <button type="submit">Start Conversation</button>
      </form>
    </div>
  );
};

export default ConversationForm;
