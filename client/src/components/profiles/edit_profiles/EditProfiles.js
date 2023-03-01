import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { EditProfileBio } from "./EditProfileBio"
import { EditProfileLinks } from "./EditProfileLinks"
import "./EditProfiles.css"


export const EditProfile = () => {
    const [profile, setProfile] = useState({})
    const { profileId } = useParams()

    const getAndSetProfile = () => {
        axios.get(`http://localhost:4000/api/profiles/${profileId}`)
            .then(({data}) => {
                setProfile(data)
            })
    }
    

    useEffect(() => {
        getAndSetProfile()
        },[profileId]
    )
    return (
        <>
            <Link to={`/profile/${profile?.userId}`}><button className="back__button">Back</button></Link>
            <h2>Edit Profile</h2>
            <section className="edit__bio">
                <EditProfileBio userId={profile?.userId} profile={profile} refresh={getAndSetProfile} />
            </section>
            <section className="edit__links">  
                <EditProfileLinks userId={profile?.userId} profileId={profile?.id} links={profile?.profileLinks} refresh={getAndSetProfile} />
            </section>

        </>
    )
}