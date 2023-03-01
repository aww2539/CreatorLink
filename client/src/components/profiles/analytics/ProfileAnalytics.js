import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import "../edit_profiles/EditProfiles.css"

export const ProfileAnalytics = () => {
    const [profile, setProfile] = useState({})
    const [links, setLinks] = useState([])
    const { profileId } = useParams()

    const getAndSetProfileAndLinks = () => {
        axios.get(`http://localhost:4000/api/profiles/${profileId}`)
            .then(({data}) => {
                setProfile(data)
                setLinks(data.profileLinks)
            })
    }
    

    useEffect(() => {
        getAndSetProfileAndLinks()
        },[profileId]
    )
    
    return (
        <>

        <Link to={`/profile/${profileId}`}><button className="edit__links">Back</button></Link>
        <article className="analytics">
            <h2>Analytics</h2>
            <h4>Profile Views: {profile?.views}</h4>

            <section className="profile__links">
                {
                    links.map((link) => {
                        return (
                            <div key={`link--${link.id}`}>
                                <h3>{link.name} - Clicks: {link.clicks}</h3>
                                <a href={link.url} target="_blank" rel="noreferrer">{link.url}</a>
                            </div>
                        )
                    })
                        
                }
            </section>
        </article>

        </>
    )
}