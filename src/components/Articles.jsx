import React from "react";

const Articles = ({ articles }) => (
    <ul>
        {articles.map((article, i) => (
            <li key={i}>{article.title}</li>
        ))}
    </ul>
);

export default Articles;
