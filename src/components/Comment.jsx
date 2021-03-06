import React from "react";
import Vote from "./Vote";

const Comment = ({ comment, handleDelete }) => (
    <div className="comment container">
        {comment.created_by === "northcoder" && (
            <button
                className="delete-button"
                onClick={() => handleDelete(comment._id)}
            >
                X
            </button>
        )}
        <h5>{comment.created_by}</h5>
        <p>{new Date(comment.created_at).toDateString()}</p>
        <p>{comment.body}</p>
        <Vote
            votes={comment.votes}
            id={comment._id}
            type={"comments"}
            articleId={comment.belongs_to}
        />
    </div>
);
export default Comment;
