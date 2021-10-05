import React from "react"
import { Link } from "react-router-dom"
import { getCurrentUser } from "../../ApiManager"
import "./Nav.css"

export const Nav = () => {
    const userId = getCurrentUser()
    return (
        <section className="navbar">
            <div className="navbar__item active">
                <Link className="navbar__link" to="/home"><button className="nav__button">Home</button></Link>
            </div>
            <div className="navbar__item active">
                <Link className="navbar__link" to="/search"><button className="nav__button">Search</button></Link>
            </div>
            <div className="navbar__item active">
                <Link className="navbar__link" to={`/profile/My${userId}`}><button className="nav__button">My Profile</button></Link>
            </div>
            <div className="navbar__item active">
                <Link className="navbar__link" to="/login" onClick={
                    () => localStorage.removeItem("creatorLink_user")
                }><button className="nav__button">Logout</button></Link>
            </div>
        </section>
    )
}
