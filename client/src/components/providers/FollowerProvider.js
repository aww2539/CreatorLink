import axios from "axios"
import React, { useState, createContext } from "react"

export const FollowerContext = createContext()

export const FollowerProvider = (props) => {
    const [follows, setFollows] = useState([])
    const [followers, setFollowers] = useState([])
    const [followCheck, setFollowCheck] = useState(false)

    const getFollows = (id) => {
        axios.get(`http://localhost:4000/api/follows/user_follows/${id}`)
            .then(({ data }) => {
                setFollows(data)
            })
    }

    const getFollowers = (id) => {
        axios.get(`http://localhost:4000/api/follows/user_followers/${id}`)
            .then(({ data }) => {
                setFollowers(data)
            })
    }

    const checkForFollow = (profileId) => {
        axios.get(`http://localhost:4000/api/follows/follow_check/${profileId}`)
            .then(({ data }) => {
                setFollowCheck(data)
            })
    } 

    const followUser = (userId, profileId) => {
        const followData = {
            followId: userId,
            followerId: profileId
        }
        axios.post(`http://localhost:4000/api/follows/follow`, followData)
            .then(() => {
                getFollowers(profileId)
            })
    }

    const unfollowUser = (id, profileId) => {
        axios.delete(`http://localhost:4000/api/follows/delete/${id}`)
            .then(() => {
                getFollowers(profileId)
            })
    }

    return (
        <FollowerContext.Provider value={{
           follows, getFollows, followers, getFollowers, followUser, unfollowUser, followCheck, checkForFollow
        }}>
            {props.children}
        </FollowerContext.Provider>
    )
}
