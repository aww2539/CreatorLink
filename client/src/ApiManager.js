
export const getCurrentUser = () => {
    return localStorage.getItem("creatorLink_user")
}

export const getPosts = async () => {
    const res = await fetch("http://localhost:4000/api/posts?_expand=user&_sort=createdAt&_order=desc")
    return await res.json()
}

export const getUsers = async () => {
    const res = await fetch("http://localhost:4000/api/users")
    return await res.json()
}

export const getProfileLinks = async (id) => {
    const res = await fetch(`http://localhost:4000/api/profileLinks?profileId=${id}&_sort=order&_order=asc`)
    return await res.json()
}

export const getUserProfile = async (id) => {
    const res = await fetch(`http://localhost:4000/api/profiles?_expand=user&userId=${id}`)
    return await res.json()
}

export const getProfiles = async () => {
    const res = await fetch("http://localhost:4000/api/profiles?_expand=user")
    return await res.json()
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


