import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCurrentUser, getProfileLinks } from "../../ApiManager"
import "./Profiles.css"

export const MyProfile = () => {
    const [profile, setProfile] = useState({})
    const [links, updateLinks] = useState([])
    const userId = getCurrentUser()

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
        getProfileLinks()
        .then((data => {updateLinks(data)}))
    },[]
    )

    const matchingLinks = links.filter(link => link.profileId === profile.id && link.show === true)

    return (
        <>

        <Link className="edit__button" to={`/profile/${userId}/edit`}><button>Edit Profile</button></Link>
        <article className="profile">
            <h2>Welcome to {profile.user?.name}'s CreatorLink!</h2>

            <section className="profile__links">
                {
                    matchingLinks.map((link) => {
                        {
                        return <div key={`link--${link.id}`}>
                                <h3>{link.title}</h3>
                                <p>{link.description}</p>
                                <a href={link.url} target="_blank">{link.url}</a>
                            </div>
                        }
                    })
                        
                }
            </section>
        </article>

        </>
    )
}
