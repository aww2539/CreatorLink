import { useEffect } from "react"
import { useState } from "react/cjs/react.development"
import { getCurrentUser } from "../../../ApiManager"


export const EditProfileBio = () => {
    const [profile, setProfile] = useState({})
    const currentUser = getCurrentUser()
    const [profileBio, updateProfileBio] = useState({
        text: ""
    })
    const getProfileData = () => {
        fetch(`http://localhost:8088/profiles/${currentUser}?_expand=user`)
        .then(response => response.json())
        .then((data) => {
            setProfile(data)
        })
    }

    useEffect(
        () => {
            getProfileData()
        },[]
    )

    const saveBio = (event) => {
        event.preventDefault()

        const fetchOption = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                bio: profileBio.text
            })
        }

        return fetch(`http://localhost:8088/profiles/${currentUser}`, fetchOption)
                .then(() => {
                    getProfileData()
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
                                    copy.text = evt.target.value
                                    updateProfileBio(copy)
                                }
                            }
                            required autoFocus
                            type="text"
                            className="form-control"
                            defaultValue={profile.bio}
                        />
                <button className="btn btn-primary" onClick={saveBio}>
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