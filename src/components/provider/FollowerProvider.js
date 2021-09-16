import React, { useState, createContext } from "react"
import { getCurrentUser } from "../../ApiManager"

// The context is imported and used by individual components that need data
export const FollowerContext = createContext()

// This component establishes what data can be used.
export const FollowerProvider = (props) => {
    const [follows, setFollows] = useState([])
    const [followers, setFollowers] = useState([])
    const currentUser = getCurrentUser()

    const getFollows = (id) => {
        return fetch(`http://localhost:8088/follows?userId=${id}`)
        .then(res => res.json())
        .then(setFollows)
    }

    const getFollowers = (id) => {
        return fetch(`http://localhost:8088/follows?idOfUserFollowed=${id}`)
        .then(res => res.json())
        .then(setFollowers)
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

        return fetch(`http://localhost:8088/follows`, fetchOption)
            .then(() => {return getFollows(parseInt(currentUser))})
    }

    const unfollowUser = (id) => {

        return fetch(`http://localhost:8088/follows/${id}`, {
            method: "DELETE"
        })
        .then(() => {return getFollows(parseInt(currentUser))})

    }

    return (
        <FollowerContext.Provider value={{
            follows, getFollows, followers, getFollowers, followUser, unfollowUser
        }}>
            {props.children}
        </FollowerContext.Provider>
    )
}
