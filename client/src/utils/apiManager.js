import axios from 'axios';


export const getCurrentUserId = () => {
    const userId = localStorage.getItem("creatorLink_user")

    return parseInt(userId)
}

export const getCurrentUser = () => {
    const userId = localStorage.getItem("creatorLink_user")

    return userId
}

export const getPosts = async () => {
    const res = await axios.get("http://localhost:4000/api/posts")
        .then(({ data }) => {
            return data
        })
    return res
}

export const getUsers = async () => {
    const res = await axios.get("http://localhost:4000/api/users")
    .then(({ data }) => {
        return data
    })
    return res
}

export const getProfileLinks = async (profileId) => {
    const res = await axios.get(`http://localhost:4000/api/profile_links/${profileId}`)
        .then(({ data }) => {
            return data
        })
    return res
}

export const getUserProfile = async (id) => {
    const res = await fetch(`http://localhost:4000/api/profiles?_expand=user&userId=${id}`)
    return await res.json()
}

export const getProfiles = async () => {
    const res = await axios.get("http://localhost:4000/api/profiles")
        .then(({ data }) => {
            return data
        })
    return res
}

export const getFollowCount = async (id) => {
    const res = await fetch(`http://localhost:4000/api/follows?idOfUserFollowed=${id}`)
    return await res.json()
}

export const getFollowCheck = async (id) => {
    const res = await fetch(`http://localhost:4000/api/follows?userId=${id}`)
    return await res.json()
}

export const getUsernamesForEmbeddedFeeds = async (id) => {
    const res = await fetch(`http://localhost:4000/api/embeddedFeeds?profileId=${id}`)
    return await res.json()
}


