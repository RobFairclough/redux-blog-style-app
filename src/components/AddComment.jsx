import React, { useState } from "react";
import axios from "axios";
import { postComment } from "../actions";
import { connect } from "react-redux";
import { API_URL } from "../utils";
const AddComment = ({ articleId, dispatch }) => {
    const [comment, setComment] = useState("");
    const [sent, send] = useState(false);
    const sendComment = async e => {
        e.preventDefault();
        if (comment) {
            const { data } = await axios.post(
                `${API_URL}/articles/${articleId}/comments`,
                {
                    comment
                }
            );
            dispatch(postComment(articleId, data.comment));
            setComment("");
            send(true);
            setTimeout(() => send(false), 3000);
        }
    };
    return (
        <form className="comment-form container" onSubmit={sendComment}>
            {sent && <p className="submit-text">Comment submitted!</p>}
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
