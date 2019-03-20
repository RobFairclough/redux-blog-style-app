import React from "react";
import ArticleLink from "./ArticleLink";

const Articles = ({ articles }) => (
    <div>
        {articles.map((article, i) => (
            <ArticleLink key={i} article={article} />
        ))}
    </div>
);
export default Articles;
