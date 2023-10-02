import React, { useState } from 'react';
import shortid from 'shortid';

const CommentForm = ({ onCommentSubmit }) => {
  const [content, setContent] = useState('');

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const generateHashName = () => {
    return shortid.generate();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const hashName = generateHashName();

    onCommentSubmit({ hashName, content });

    setContent('');
  };

  return (
    <div>
      <h2>Add a Comment</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Comment:
          <textarea value={content} onChange={handleContentChange} required></textarea>
        </label>
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default CommentForm;
