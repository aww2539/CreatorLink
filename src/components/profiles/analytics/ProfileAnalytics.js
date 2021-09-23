import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCurrentUser, getProfileLinks } from "../../../ApiManager"
import "../edit_profiles/EditProfiles.css"

export const ProfileAnalytics = () => {
    const [profile, setProfile] = useState({})
    const [links, updateLinks] = useState([])
    const userId = getCurrentUser()

    useEffect(
        () => {
            return fetch(`https://creator-link-api-wod88.ondigitalocean.app/profiles/${userId}?_expand=user`)
                .then(response => response.json())
                .then((data) => {
                    setProfile(data)
                })

        },
        []
    )

    useEffect(() => {
        getProfileLinks(userId)
        .then((data => {updateLinks(data)}))
    },[]
    )
    
    return (
        <>

        <Link to={`/profile/My${userId}`}><button className="edit__links">Back</button></Link>
        <article className="analytics">
            <h2>Analytics</h2>
            <h4>Profile Clicks: {profile?.clicks}</h4>

            <section className="profile__links">
                {
                    links.map((link) => {
                        {
                        return <div key={`link--${link.id}`}>
                                <h3>{link.title} - Link Clicks: {link.clicks}</h3>
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