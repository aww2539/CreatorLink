import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCurrentUser, getFollowCheck, getProfiles } from "../../ApiManager"
import Analytics from "../profiles/analytics/Analytics"
import "./Nav.css"

export const QuickAccess = () => {
    const [profiles, updateProfiles] = useState([])
    const [following, updateFollowing] = useState([])
    const [followedProfiles, updateFollowedProfiles] = useState([])
    const currentUser = getCurrentUser()

    const fetchProfiles = () => {
        getProfiles()
        .then((data) => {updateProfiles(data)})
    }

    useEffect(() => {
        fetchProfiles()
    },[])

    useEffect(() => {
        getFollowCheck(currentUser)
        .then((data) => {updateFollowing(data)})
    },[])

    useEffect(() => {
        let arr = []
        for (const follow of following) {
            const foundProfile = profiles.find(profile => profile.id === follow?.idOfUserFollowed)
            if (foundProfile !== undefined) {
                arr.push(foundProfile)
            }
        }
        updateFollowedProfiles(arr)
    },[following])


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