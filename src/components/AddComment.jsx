import React, { useState } from "react";
import axios from "axios";
import { postComment } from "../actions";
import { connect } from "react-redux";
const AddComment = ({ articleId, dispatch }) => {
    const [comment, setComment] = useState("");
    const [sent, send] = useState(false);
    const sendComment = e => {
        e.preventDefault();
        if (comment) {
            axios
                .post(
                    `https://nc-news-api.herokuapp.com/api/articles/${articleId}/comments`,
                    { comment }
                )
                .then(({ data: { comment } }) =>
                    dispatch(postComment(articleId, comment))
                );
            send(true);
            setComment("");
        }
    };
    return (
        <form className="comment-form container" onSubmit={sendComment}>
            {sent && <p>Comment submitted!</p>}
            <label htmlFor="comment-body">Your comment:</label>
            <input
                type="text"
                onChange={({ target: { value } }) => setComment(value)}
                value={comment}
                name="comment-body"
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default connect()(AddComment);
