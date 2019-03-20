import React from "react";

const Comment = ({ comment }) => (
    <div className="comment">
        <h5>{comment.created_by}</h5>
        <p>{comment.body}</p>
    </div>
);

export default Comment;
