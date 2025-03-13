import axios from 'axios';
import humps from 'humps';


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
            console.log(data)
            const formatted = humps.camelizeKeys(data)
            console.log(formatted)
            return humps.camelizeKeys(data)
        })
    return res
}

export const getUsers = async () => {
    const res = await axios.get("http://localhost:4000/api/users")
    .then(({ data }) => {
        return humps.camelizeKeys(data)
    })
    return res
}

export const getProfileLinks = async (profileId) => {
    const res = await axios.get(`http://localhost:4000/api/profile_links/${profileId}`)
        .then(({ data }) => {
            return humps.camelizeKeys(data)
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
            return humps.camelizeKeys(data)
        })
    return res
}

export const addProfileView = async (profileId) => {
    const res = await axios.post(`http://localhost:4000/api/profiles/${profileId}/add_view`)
        .then(({ data }) => {
            return humps.camelizeKeys(data)
        })
    return res
}

