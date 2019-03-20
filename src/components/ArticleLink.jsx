import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const ArticleLink = ({ article }) => (
    <div className="link-box">
        <Link to={`/articles/${article._id}`} className="link-text">
            {article.title}
        </Link>
    </div>
);

export default ArticleLink;
