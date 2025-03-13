import axios from "axios"
import humps from 'humps';

import React, { useState, createContext } from "react"

export const FollowerContext = createContext()

export const FollowerProvider = (props) => {
    const [follows, setFollows] = useState([])
    const [followers, setFollowers] = useState([])
    const [followCheck, setFollowCheck] = useState(false)
    const [quickAccess, setQuickAccess] = useState([])

    const getFollows = (id) => {
        axios.get(`http://localhost:4000/api/follows?user_follows=true&user_id=${id}`)
            .then(({ data }) => {
                setFollows(humps.camelizeKeys(data))
            })
    }

    const getQuickAccess = (id) => {
        axios.get(`http://localhost:4000/api/follows?user_follows=true&user_id=${id}`)
            .then(({ data }) => {
                setQuickAccess(humps.camelizeKeys(data))
            })
    }

    const getFollowers = (id) => {
        axios.get(`http://localhost:4000/api/follows?user_followers=true&user_id=${id}`)
            .then(({ data }) => {
                setFollowers(humps.camelizeKeys(data))
            })
    }

    const checkForFollow = (profileId) => {
        axios.get(`http://localhost:4000/api/follows?follow_check=true&profile_id=${profileId}`)
            .then(({ data }) => {
                setFollowCheck(humps.camelizeKeys(data))
            })
    } 

    const followUser = (userId, profileId) => {
        const followData = {
            follow_id: userId,
            follower_id: profileId
        }
        axios.post(`http://localhost:4000/api/follows`, followData)
            .then(() => {
                getFollowers(profileId)
                getQuickAccess(userId)
            })
    }

    const unfollowUser = (id, userId, profileId) => {
        axios.delete(`http://localhost:4000/api/follows/${id}`)
            .then(() => {
                getFollowers(profileId)
                getQuickAccess(userId)
            })
    }

    return (
        <FollowerContext.Provider value={{
           follows, getFollows, followers, getFollowers, followUser, unfollowUser, followCheck, checkForFollow, quickAccess, getQuickAccess
        }}>
            {props.children}
        </FollowerContext.Provider>
    )
}
