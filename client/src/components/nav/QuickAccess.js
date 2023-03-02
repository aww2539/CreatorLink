import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCurrentUserId } from "../../utils/apiManager"
import { FollowerContext } from "../providers/FollowerProvider"
import "./Nav.css"

export const QuickAccess = () => {
    const [profileData, setProfileData] = useState([])
    const { quickAccess, getQuickAccess } = useContext(FollowerContext)
    const userId = getCurrentUserId()

    useEffect(() => {
        const data = quickAccess.map((f) => f.follower)
        setProfileData(data)
    },[quickAccess])

    useEffect(() => {
        getQuickAccess(userId)
    },[userId])


    return (
        <>
            <h3>QuickAccess</h3>
            {
                profileData.map((profile) => {
                    return (
                        <Link className="quickAccess__link" to={`/profile/${profile.id}`}>
                            <button className="quickAccess">{profile.username}</button>
                        </Link>
                    )
                })
            }
        </>
    )
}