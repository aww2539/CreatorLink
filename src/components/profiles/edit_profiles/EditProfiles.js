import { Link } from "react-router-dom"
import { getCurrentUser } from "../../../ApiManager"
import { EditProfileBio } from "./EditProfileBio"
import { EditProfileLinks } from "./EditProfileLinks"
import "./EditProfiles.css"


export const EditProfile = () => {
    const userId = getCurrentUser()

    return (
        <>
            <Link to={`/profile/My${userId}`}><button className="back__button">Back</button></Link>
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