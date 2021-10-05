
export const getCurrentUser = () => {
    return localStorage.getItem("creatorLink_user")
}

export const getPosts = async () => {
    const res = await fetch("https://creator-link-api-wod88.ondigitalocean.app/posts?_expand=user&_sort=createdAt&_order=desc")
    return await res.json()
}

export const getUsers = async () => {
    const res = await fetch("https://creator-link-api-wod88.ondigitalocean.app/users")
    return await res.json()
}

export const getProfileLinks = async (id) => {
    const res = await fetch(`https://creator-link-api-wod88.ondigitalocean.app/profileLinks?profileId=${id}&_sort=order&_order=asc`)
    return await res.json()
}

export const getUserProfile = async (id) => {
    const res = await fetch(`https://creator-link-api-wod88.ondigitalocean.app/profiles?_expand=user&userId=${id}`)
    return await res.json()
}

export const getProfiles = async () => {
    const res = await fetch("https://creator-link-api-wod88.ondigitalocean.app/profiles?_expand=user")
    return await res.json()
}

export const getFollowCount = async (id) => {
    const res = await fetch(`https://creator-link-api-wod88.ondigitalocean.app/follows?idOfUserFollowed=${id}`)
    return await res.json()
}

export const getFollowCheck = async (id) => {
    const res = await fetch(`https://creator-link-api-wod88.ondigitalocean.app/follows?userId=${id}`)
    return await res.json()
}

export const getUsernamesForEmbeddedFeeds = async (id) => {
    const res = await fetch(`https://creator-link-api-wod88.ondigitalocean.app/embeddedFeeds?profileId=${id}`)
    return await res.json()
}


