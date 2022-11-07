import React from "react";
import { Link } from "react-router-dom";
import Auth from '../../utils/auth'
import './style.css'

function Navbar() {
    function showNavLoginStatus() {
        if (Auth.loggedIn()) {
            return (
                <ul className="navLinks">
                    <li>
                        <Link to="/"
                            className="link"
                            onClick={() => Auth.logout()}>
                            Logout
                        </Link>
                    </li>
                </ul>
            );
        } else {
            return (
                <ul className="navLinks">
                    <li>
                        <Link to="/login"
                            className="link">
                            Login
                        </Link>
                    </li>
                </ul>
            )
        }
    }
    return (
        <header className="header">
            <h1>
                <Link to="/"
                    className="pageName">
                    Game
                </Link>
            </h1>

            <nav className="navLink">
                <ul className="navLinks">
                    <li>
                        <Link to="/scoreboard"
                            className="link">
                            Scoreboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile"
                            className="link">
                            Profile
                        </Link>
                    </li>
                </ul>
                {showNavLoginStatus()}
            </nav>
        </header>
    );
}

export default Navbar;