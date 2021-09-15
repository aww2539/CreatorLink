
export const getCurrentUser = () => {
    return localStorage.getItem("creatorLink_user")
}

export const getPosts = async () => {
    const res = await fetch("http://localhost:8088/posts?_expand=user&_sort=createdAt&_order=desc")
    return await res.json()
}

export const getUsers = async () => {
    const res = await fetch("http://localhost:8088/users")
    return await res.json()
}

export const getProfileLinks = async (id) => {
    const res = await fetch(`http://localhost:8088/profileLinks?profileId=${id}&_sort=order&_order=asc`)
    return await res.json()
}

export const getLinkAnalytics = async (id) => {
    const res = await fetch(`http://localhost:8088/analytics?profileLinkId=${id}`)
    return await res.json()
}

export const getProfiles = async () => {
    const res = await fetch("http://localhost:8088/profiles?_expand=user")
    return await res.json()
}

export const getFollowedProfiles = async (id) => {
    const res = await fetch(`http://localhost:8088/follows?userId=${id}`)
    return await res.json()
}

