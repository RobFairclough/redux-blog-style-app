import React from "react";
import Vote from "./Vote";

const Comment = ({ comment }) => (
    <div className="comment container">
        <h5>{comment.created_by}</h5>
        <p>{comment.body}</p>
        <Vote votes={comment.votes} id={comment._id} type={"comments"} />
    </div>
);

export default Comment;
