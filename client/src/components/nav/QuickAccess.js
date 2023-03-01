import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCurrentUserId } from "../../utils/apiManager"
import { FollowerContext } from "../provider/FollowerProvider"
import "./Nav.css"

export const QuickAccess = () => {
    const [profileData, setProfileData] = useState([])
    const { follows, getFollows } = useContext(FollowerContext)
    const userId = getCurrentUserId()

    useEffect(() => {
        setProfileData(follows.profiles)
    },[follows])

    useEffect(() => {
        getFollows(userId)
    },[userId])


    return (
        <>
            <h3>QuickAccess</h3>
            {
                profileData.map((profile) => {
                    return (
                        <Link className="quickAccess__link" to={`/profile/${profile.id}`}>
                            <button className="quickAccess">{profile.user.name}</button>
                        </Link>
                    )
                })
            }
        </>
    )
}