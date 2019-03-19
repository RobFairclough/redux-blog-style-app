import React from "react";
import ArticleLink from "./ArticleLink";

const Articles = ({ articles }) => {
    return (
        <ul>
            {articles.map((article, i) => (
                <ArticleLink key={i} article={article} />
            ))}
        </ul>
    );
};

export default Articles;
