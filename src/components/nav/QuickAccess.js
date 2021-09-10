import React from "react"
import { Link } from "react-router-dom"
import "./Nav.css"

export const QuickAccess = () => {
    return (
        <>
            <div className="quickAccess">
                <ul className="quickAccess_list">
                    <li className="quickAccess__item active">
                        <Link className="quickAccess__link" to="/profile/:profileId(\d+)">Creator Name</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}