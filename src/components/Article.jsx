import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./article.css";
import { fetchArticleById, fetchComments } from "../actions";
import Comment from "./Comment";
const Article = ({ articles, dispatch, match, comments }) => {
    const { id } = match.params;
    const article = articles.find(article => article._id === id);
    const articleComments = comments[id];
    useEffect(() => {
        if (!article) dispatch(fetchArticleById(id));
        if (!articleComments) dispatch(fetchComments(id));
    }, [articles.join(",")]);

    return article ? (
        <>
            <div className="article container">
                <h1>{article.title}</h1>
                <h2>By {article.author}</h2>
                <p>{article.body}</p>
            </div>
            {articleComments && (
                <div className="comments container">
                    {articleComments.map(comment => (
                        <Comment comment={comment} />
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
    const { articlesByTopic, comments } = state;
    const { items: articles } = articlesByTopic.all || { items: [] };
    return { articles, comments };
};
export default connect(mapStateToProps)(Article);
