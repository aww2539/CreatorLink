import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCurrentUser } from "../../ApiManager"

export const MyProfile = () => {
    const [profile, setProfile] = useState({})
    const [links, updateLinks] = useState([])
    const userId = getCurrentUser()


    // Fetch the individual ticket when the parameter value changes
    useEffect(
        () => {
            return fetch(`http://localhost:8088/profiles/${userId}?_expand=user`)
                .then(response => response.json())
                .then((data) => {
                    setProfile(data)
                })

        },
        []
    )

    useEffect(() => {
        
    })

    return (
        <>

        <article>
            <h2>User profiles</h2>
            <Link className="edit__button" to={`/profile/${userId}/edit`}><button>Edit Profile</button></Link>
        </article>

        </>
    )
}
