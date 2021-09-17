import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCurrentUser, getFollowCheck, getProfiles } from "../../ApiManager"
import Analytics from "../profiles/analytics/Analytics"
import { FollowerContext } from "../provider/FollowerProvider"
import "./Nav.css"

export const QuickAccess = () => {
    const [profiles, updateProfiles] = useState([])
    const [followedProfiles, updateFollowedProfiles] = useState([])
    const { quickAccessFollowings, getQuickAccessFollowings  } = useContext(FollowerContext)
    const currentUser = getCurrentUser()

    const fetchProfiles = async () => {
        const data = await getProfiles()
        updateProfiles(data)
    }

    useEffect(() => {
        fetchProfiles()
    },[])

    useEffect(() => {
        return getQuickAccessFollowings(currentUser)
    },[])

    useEffect(() => {
        let arr = []
        for (const follow of quickAccessFollowings) {
            const foundProfile = profiles.find(profile => profile.id === follow?.idOfUserFollowed)
            if (foundProfile !== undefined) {
                arr.push(foundProfile)
            }
        }
        updateFollowedProfiles(arr)
    },[quickAccessFollowings])


    return (
        <>
            <h3>QuickAccess User List</h3>
            {
                followedProfiles.map((profile) => {
                return <div className="quickAccess">
                            <ul className="quickAccess_list">
                                <li className="quickAccess__item active">
                                    <Link className="quickAccess__link" to={`/profile/${profile.id}`} onClick={() => {
                                        Analytics.addProfileClick(profile.id, profile.clicks)
                                        .then(() => {fetchProfiles()})}}>
                                        {profile.user.name}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                })
            }
        </>
    )
}