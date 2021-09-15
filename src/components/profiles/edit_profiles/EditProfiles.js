import { Link } from "react-router-dom"
import { getCurrentUser } from "../../../ApiManager"
import { EditProfileBio } from "./EditProfileBio"
import { EditProfileLinks } from "./EditProfileLinks"
import "./EditProfiles.css"


export const EditProfile = () => {
    const userId = getCurrentUser()

    return (
        <>
            <Link className="back__button" to={`/profile/My${userId}`}><button>Back</button></Link>
            <Link className="analytics__button" to={`/profile/My${userId}/analytics`}><button>Analytics</button></Link>
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