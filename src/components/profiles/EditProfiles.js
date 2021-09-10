import { Link } from "react-router-dom"
import { getCurrentUser } from "../../ApiManager"


export const EditProfile = () => {
    const userId = getCurrentUser()


    return (
        <>
            <Link className="back__button" to={`/profile/${userId}`}><button>Back</button></Link>
            <h2>Edit Profile</h2>
        </>
    )
}