import React from "react";
import "./header.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Header = () => (
    <header>
        <span className="logo">
            <Link to="/" className="logo">
                Redux redux
            </Link>
        </span>
    </header>
);

export default Header;
