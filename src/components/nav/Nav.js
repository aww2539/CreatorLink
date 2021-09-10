import React from "react"
import { Link } from "react-router-dom"
import { getCurrentUser } from "../../ApiManager"
import "./Nav.css"

export const Nav = () => {
    const userId = getCurrentUser()
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/home">Home</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/search">Search</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to={`/profile/${userId}`}>My Profile</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/login" onClick={
                    () => localStorage.removeItem("creatorLink_user")
                }>Logout</Link>
            </li>
        </ul>
    )
}
