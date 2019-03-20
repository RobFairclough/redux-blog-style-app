import React, { useState, useEffect } from "react";
import axios from "axios";

const Vote = ({ votes, id, type }) => {
    const [score, setScore] = useState(votes || 0);
    const [vote, setVote] = useState(null);

    useEffect(() => {
        const change = vote === "up" ? 1 : vote === "down" ? -1 : 0;
        if (change) {
            setScore(score + change);
            axios.put(
                `https://nc-news-api.herokuapp.com/api/${type}/${id}?vote=${vote}`
            );
        }
    }, [vote]);

    return (
        <div className="vote-container">
            <button onClick={() => setVote("up")}>up</button>
            <p>{score}</p>
            <button onClick={() => setVote("down")}>down</button>
        </div>
    );
};

export default Vote;
