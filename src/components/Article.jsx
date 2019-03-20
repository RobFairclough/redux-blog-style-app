import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./article.css";
import { fetchArticleById, fetchComments, deleteComment } from "../actions";
import Comment from "./Comment";
import Vote from "./Vote";
import AddComment from "./AddComment";
import axios from "axios";
const Article = ({ articles, dispatch, match, comments }) => {
    const { id } = match.params;
    const article = articles.find(article => article._id === id);
    const articleComments = comments[id];

    useEffect(() => {
        if (!article) dispatch(fetchArticleById(id));
        if (!articleComments) dispatch(fetchComments(id));
    }, [articles.join(",")]);

    const handleDeleteComment = commentId => {
        axios
            .delete(
                `https://nc-news-api.herokuapp.com/api/comments/${commentId}`
            )
            .then(() => {
                dispatch(deleteComment(id, commentId));
            });
    };
    return article ? (
        <>
            <div className="article container">
                <h1>{article.title}</h1>
                <h2>By {article.author}</h2>
                <p>{article.body}</p>
                <Vote votes={article.votes} id={id} type={"articles"} />
            </div>
            <AddComment articleId={id} />
            {articleComments && (
                <div className="comments container">
                    {articleComments.map((comment, i) => (
                        <Comment
                            comment={comment}
                            handleDelete={handleDeleteComment}
                            key={i}
                        />
                    ))}
                </div>
            )}
        </>
    ) : (
        // todo: add loading article message
        <p>Article not found</p>
    );
};

const mapStateToProps = state => {
    const { articles, comments } = state;
    const { items } = articles || { items: [] };
    return { articles: items, comments };
};
export default connect(mapStateToProps)(Article);
