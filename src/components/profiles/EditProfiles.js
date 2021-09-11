import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useState } from "react/cjs/react.development"
import { getCurrentUser, getProfileLinks } from "../../ApiManager"
import { AddLinksForm } from "./AddProfileLinks"
import "./EditProfiles.css"


export const EditProfile = () => {
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
        },[]
    )

    useEffect(() => {
        getProfileLinks()
        .then((data => {updateLinks(data)}))
    },[]
    )
    const matchingLinks = links.filter(link => link.profileId === profile.id)

    return (
        <>
            <Link className="back__button" to={`/profile/${userId}`}><button>Back</button></Link>
            <h2>Edit Profile</h2>
            <section className="edit__bio">
                <div>
                    <h4>Edit Bio</h4>

                </div>
                <div>
                    <h4>Current Bio</h4>
                    <p>{profile.bio}</p>
                </div>
            </section>
            <section className="edit__links">
                <div>
                    <h4>Add link</h4>
                    <AddLinksForm />
                </div>
                <div>
                    <h4>Current links</h4>
                    {
                        matchingLinks.map((link) => {
                            return <ul key={link.id}>
                                <li>{link.title}</li>
                            </ul>
                        })
                    }
                </div>
            </section>

        </>
    )
}