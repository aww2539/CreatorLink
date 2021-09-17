import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { getCurrentUser, getProfileLinks } from "../../../ApiManager";
import OrderProfileLinks from "./OrderProfileLinks";
import "./EditProfiles.css"


export const EditProfileLinks = () => {
    const [profileLinks, updateProfileLinks] = useState([])
    const userId = getCurrentUser()
    const [link, updateLink] = useState({
        show: true,
        title: "",
        url: "",
        description: "",
    });
    
    const fetchLinks = async () => {
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
            description: link.description,
            clicks: 0
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
                        const linkAbove = link.order - 1
                        const linkBelow = link.order + 1
                        const foundLinkAbove = profileLinks.find(l => l.order === linkAbove)
                        const foundLinkBelow = profileLinks.find(l => l.order === linkBelow)
                        console.log(link.order);


                        return <> 
                            <li key={link.id}><a href={link.url} target="_blank">{link.title}</a>

                                {link.order === 1 ? "" : <button onClick={() => {
                                    OrderProfileLinks.moveLinkUp(link.id, link.order, foundLinkAbove?.id, foundLinkAbove?.order).then(() => {fetchLinks()})
                                }}>Move Up</button>}

                                {profileLinks.length === link.order ? "" : <button onClick={() => {
                                    OrderProfileLinks.moveLinkDown(link.id, link.order, foundLinkBelow?.id, foundLinkBelow?.order).then(() => {fetchLinks()}) 
                                }}>Move Down</button>}

                            </li>
                            <button className="delete__btn" onClick={() => {deleteLink(link.id)}}>Delete</button>
                        </>
                    })
            }
            </ol>
        </div>
        </>
    )
}