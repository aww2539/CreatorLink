import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { getCurrentUser, getProfileLinks } from "../../ApiManager";


export const EditProfileLinks = () => {
    const [profileLinks, updateProfileLinks] = useState([])
    const userId = getCurrentUser()
    const [link, updateLink] = useState({
        show: true,
        title: "",
        url: "",
        description: "",
    });
    const fetchLinks = () => {
        getProfileLinks(userId)
        .then((data => {updateProfileLinks(data)}))
    }

    useEffect(() => {
        fetchLinks()
    },[]
    )

    const saveLink = (event) => {
        event.preventDefault()

        const newLink = {
            profileId: parseInt(userId),
            order: profileLinks.length + 1,
            show: true,
            title: link.title,
            url: link.url,
            description: link.description
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newLink)
        }

        return fetch("http://localhost:8088/profileLinks", fetchOption)
                .then(() => {
                    fetchLinks()
                })
    }

    const deleteLink = (id) => {
        fetch(`http://localhost:8088/profileLinks/${id}`, {
            method: "DELETE"
        })
        .then(fetchLinks)
    }

    return (
        <>
        <div>
            <h4>Add link</h4>
            <form className="linkForm">
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Title:</label>
                        <input
                            onChange = {
                                (evt) => {
                                    const copy = {...link}
                                    copy.title = evt.target.value
                                    updateLink(copy)
                                }
                            }
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Link Title"
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="url">URL:</label>
                        <input
                            onChange = {
                                (evt) => {
                                    const copy = {...link}
                                    copy.url = evt.target.value
                                    updateLink(copy)
                                }
                            }
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="URL"
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                            <input 
                                onChange = {
                                    (evt) => {
                                        const copy = {...link}
                                        copy.description = evt.target.value
                                        updateLink(copy)
                                    }
                                }
                                required autoFocus
                                type="text"
                                className="form-control"
                                placeholder="Link Description"
                            />
                    </div>
                </fieldset>
                <button className="btn btn-primary" onClick={saveLink}>
                    Save Link
                </button>
            </form>
        </div>
        <div>
            <h4>Current links</h4>
            <ol className="profileLink__list">
            {
                profileLinks.map((link) => {
                        return <> 
                            <li><a href={link.url} target="_blank">{link.title}</a></li>
                            <button onClick={() => {deleteLink(link.id)}}>Delete</button>
                        </>
                    })
            }
            </ol>
        </div>
        </>
    )
}