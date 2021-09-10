import React from "react"
import { Link } from "react-router-dom"
import "./Nav.css"

export const Nav = () => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/home">Home</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/search">Search</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/profile">My Profile</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/login">Logout</Link>
            </li>
        </ul>
    )
}
