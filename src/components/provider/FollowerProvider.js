import React, { useState, createContext } from "react"
import { getCurrentUser } from "../../ApiManager"

// The context is imported and used by individual components that need data
export const FollowerContext = createContext()

// This component establishes what data can be used.
export const FollowerProvider = (props) => {
    const [profiles, setProfiles] = useState([])
    const [followings, setFollowings] = useState([])
    const [followers, setFollowers] = useState([])
    const [quickAccessFollowings, setQuickAccessFollowings] = useState([])

    const getProfiles = () => {
        return fetch(`https://creator-link-api-wod88.ondigitalocean.app/profiles?_expand=user`)
        .then(res => res.json())
        .then(setProfiles)
    }

    const getFollowings = (id) => {
        return fetch(`https://creator-link-api-wod88.ondigitalocean.app/follows?userId=${id}`)
        .then(res => res.json())
        .then(setFollowings)
    }

    const getFollowers = (id) => {
        return fetch(`https://creator-link-api-wod88.ondigitalocean.app/follows?idOfUserFollowed=${id}`)
        .then(res => res.json())
        .then(setFollowers)
    }

    const getQuickAccessFollowings = (id) => {
        return fetch(`https://creator-link-api-wod88.ondigitalocean.app/follows?userId=${id}`)
        .then(res => res.json())
        .then(setQuickAccessFollowings)
    }

    const followUser = (userId, idOfUserFollowed) => {

        const followData = {
            userId: userId,
            idOfUserFollowed: idOfUserFollowed
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(followData)
        }

        return fetch(`https://creator-link-api-wod88.ondigitalocean.app/follows`, fetchOption)
    }

    const unfollowUser = (id) => {

        return fetch(`https://creator-link-api-wod88.ondigitalocean.app/follows/${id}`, {
            method: "DELETE"
        })

    }

    return (
        <FollowerContext.Provider value={{
           profiles, getProfiles, followings, getFollowings, followers, getFollowers, quickAccessFollowings, getQuickAccessFollowings, followUser, unfollowUser
        }}>
            {props.children}
        </FollowerContext.Provider>
    )
}
