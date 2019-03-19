import React from "react";

const Articles = ({ articles }) => {
    console.log(articles, "prop");
    return (
        <ul>
            {articles.map((article, i) => (
                <li key={i}>{article.title}</li>
            ))}
        </ul>
    );
};

export default Articles;
