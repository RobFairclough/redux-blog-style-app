import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Header = () => (
    <header>
        <span className="logo">
            <Link to="/">Redux redux</Link>
        </span>
    </header>
);

export default Header;
