import React from 'react';

const CommentList = ({ comments }) => {
  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>
            <strong>{comment.hashName}</strong>: {comment.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
