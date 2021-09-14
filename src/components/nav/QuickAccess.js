import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCurrentUser, getProfiles } from "../../ApiManager"
import "./Nav.css"

export const QuickAccess = () => {
    const [profiles, updateProfiles] = useState([])
    const currentUser = getCurrentUser()

    useEffect(() => {
        getProfiles()
        .then((data) => {updateProfiles(data)})
    },[]
    )
    return (
        <>
            <h3>QuickAccess User List</h3>
            {
                profiles.map((profile) => {
                return profile.user.id !== parseInt(currentUser) ? <div className="quickAccess">
                            <ul className="quickAccess_list">
                                <li className="quickAccess__item active">
                                    <Link className="quickAccess__link" to={`/profile/${profile.id}`}>{profile.user.name}</Link>
                                </li>
                            </ul>
                        </div>
                    : ""
                })
            }
        </>
    )
}