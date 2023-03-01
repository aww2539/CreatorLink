import axios from "axios"
import { useEffect } from "react"
import { useState } from "react/cjs/react.development"
import { getCurrentUser } from "../../../utils/apiManager"


export const EditProfileBio = ({ userId, profile, refresh }) => {
    const [profileBio, updateProfileBio] = useState({
        bio: ""
    })

    const saveBio = (event) => {
        event.preventDefault()

        axios.put(`http://localhost:4000/api/profiles/update/${profile.id}`, {bio: profileBio.bio})
                .then(() => {
                    refresh()
                })
    }

    return (
        <>
            <div>
                <h4>Edit Bio</h4>
                <label htmlFor="bio">Update Bio:</label>
                        <input
                            onChange = {
                                (evt) => {
                                    const copy = {...profileBio}
                                    copy.bio = evt.target.value
                                    updateProfileBio(copy)
                                }
                            }
                            required autoFocus
                            type="text"
                            className="form-control"
                            defaultValue={profile.bio}
                        />
                <button className="update__bio" onClick={saveBio}>
                    Update
                </button>
            </div>
            <div>
                <h4>Current Bio</h4>
                <p>{profile.bio}</p>
            </div>
        </>
    )
}