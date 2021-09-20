import { useEffect } from "react"
import { useState } from "react/cjs/react.development"
import { getCurrentUser } from "../../../ApiManager"


export const EditProfileEmbeds = () => {
    const [embeds, setEmbeds] = useState({})
    const currentUser = getCurrentUser()
    const [profileEmbeds, updateProfileEmbeds] = useState({
        twitter: "",
        youtube: ""
    })

    const getProfileEmbeds = () => {
        fetch(`http://localhost:8088/profileEmbeds/${currentUser}`)
        .then(response => response.json())
        .then((data) => {
            setEmbeds(data)
        })
    }

    useEffect(
        () => {
            getProfileEmbeds()
        },[]
    )

    const saveEmbed = (event) => {
        event.preventDefault()

        const fetchOption = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                twitter: profileEmbeds.twitter,
                youtube: profileEmbeds.youtube
            })
        }

        return fetch(`http://localhost:8088/profileEmbeds/${currentUser}`, fetchOption)
                .then(() => {
                    getProfileEmbeds()
                })
    }

    return (
        <>
            <div>
                <h4>Edit Embeds</h4>
                <label htmlFor="twitter">Update Twitter Username:</label>
                        <input
                            onChange = {
                                (evt) => {
                                    const copy = {...profileEmbeds}
                                    copy.twitter = evt.target.value
                                    updateProfileEmbeds(copy)
                                }
                            }
                            required autoFocus
                            type="text"
                            className="form-control"
                            defaultValue={embeds.twitter}
                        />
                    <p><a href="https://twitter.com/settings/screen_name" target="_blank">Not sure what your username is?</a></p>
                <label htmlFor="youtube">Update YouTube Channel ID:</label>
                        <input
                            onChange = {
                                (evt) => {
                                    const copy = {...profileEmbeds}
                                    copy.youtube = evt.target.value
                                    updateProfileEmbeds(copy)
                                }
                            }
                            required autoFocus
                            type="text"
                            className="form-control"
                            defaultValue={embeds.youtube}
                        />
                     <p><a href="https://www.youtube.com/account_advanced" target="_blank">Not sure what your Channel ID is?</a></p>
                <button className="btn btn-primary" onClick={saveEmbed}>
                    Update
                </button>
            </div>
            <div>
                <h4>Current Usernames:</h4>
                <p>Twitter: {embeds.twitter}</p>
                <p>YouTube: {embeds.youtube}</p>
            </div>
        </>
    )
}