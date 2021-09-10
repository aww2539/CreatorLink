import React, { useEffect, useState } from "react"
import { getCurrentUser } from "../../ApiManager"

export const MyProfile = () => {
    const [profile, setProfile] = useState({})
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

    return (
        <>

        <article>
            <h2>User profiles</h2>
        </article>

        </>
    )
}
