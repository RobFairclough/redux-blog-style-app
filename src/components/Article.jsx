import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchArticleById } from "../actions";
const Article = ({ articles, dispatch, match }) => {
    const { id } = match.params;
    const article = articles.find(article => article._id === id);
    useEffect(() => {
        if (!article) dispatch(fetchArticleById(id));
    }, [articles.join(",")]);

    return article ? (
        <div>
            <h1>{article.title}</h1>
            <h2>By {article.author}</h2>
            <p>{article.body}</p>
        </div>
    ) : (
        <p>Article not found</p>
    );
};

const mapStateToProps = state => {
    const { articlesByTopic } = state;
    const { items: articles } = articlesByTopic.all || { items: [] };
    return { articles };
};
export default connect(mapStateToProps)(Article);
