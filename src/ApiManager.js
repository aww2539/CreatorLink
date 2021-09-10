

export const getPosts = () => {
    return fetch("http://localhost:8088/posts?_expand=user")
        .then(res => res.json())
}

export const getUsers = () => {
    return fetch("http://localhost:8088/users")
        .then(res => res.json())
}

export const getProfileLinks = () => {
    return fetch("http://localhost:8088/profileLinks")
        .then(res => res.json())
}