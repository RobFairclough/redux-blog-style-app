import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const ArticleLink = ({ article }) => {
    return (
        <p>
            <Link to={`/articles/${article._id}`}>{article.title}</Link>
        </p>
    );
};

export default ArticleLink;
