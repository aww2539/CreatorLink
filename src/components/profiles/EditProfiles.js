import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useState } from "react/cjs/react.development"
import { getCurrentUser, getProfileLinks } from "../../ApiManager"
import { EditProfileBio } from "./EditProfileBio"
import { EditProfileLinks } from "./EditProfileLinks"
import "./EditProfiles.css"


export const EditProfile = () => {
    const userId = getCurrentUser()

    return (
        <>
            <Link className="back__button" to={`/profile/${userId}`}><button>Back</button></Link>
            <h2>Edit Profile</h2>
            <section className="edit__bio">
                <EditProfileBio />
            </section>
            <section className="edit__links">  
                <EditProfileLinks />
            </section>

        </>
    )
}