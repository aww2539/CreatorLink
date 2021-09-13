

export const getPosts = () => {
    return fetch("http://localhost:8088/posts?_expand=user&_sort=createdAt&_order=desc") // sort descending by createdAt property
        .then(res => res.json())
}

export const getUsers = () => {
    return fetch("http://localhost:8088/users")
        .then(res => res.json())
}

export const getProfileLinks = () => {
    return fetch(`http://localhost:8088/profileLinks`)
        .then(res => res.json())
}

export const getCurrentUser = () => {
    return localStorage.getItem("creatorLink_user")
}