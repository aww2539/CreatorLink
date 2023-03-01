import { useState } from "react/cjs/react.development";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import "./EditProfiles.css"
import axios from "axios";

export const EditProfileLinks = ({ userId, profileId, links, refresh }) => {
    const [link, updateLink] = useState({
        name: "",
        url: "",
        description: "",
    });

    const saveLink = (event) => {
        event.preventDefault()

        const newLink = {
            profileId: profileId,
            userId: userId,
            order: links.length + 1,
            name: link.name,
            url: link.url,
            description: link.description,
            clicks: 0
        }

        axios.post("http://localhost:4000/api/profile_links", newLink)
                .then(() => {
                    refresh()
                })
    }

    const deleteLink = (id) => {
        axios.delete(`http://localhost:4000/api/profile_links/${id}`)
            .then(() => {
                refresh()
            })
    }

    const changeLinkOrder = (direction, id) => {
        console.log(direction, id)
        axios.put(`http://localhost:4000/api/profile_links/${id}/move/${direction}`)
            .then(() => {
                refresh()
            })
    }




    return (
        <>
        <div>
            <h4>Add link</h4>
            <form className="linkForm">
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            onChange = {
                                (evt) => {
                                    const copy = {...link}
                                    copy.name = evt.target.value
                                    updateLink(copy)
                                }
                            }
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Link Name"
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
                {/* <fieldset>
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
                </fieldset> */}
                <button className="btn btn-primary" onClick={saveLink}>
                    Save Link
                </button>
            </form>
        </div>
        <div>
            <h4>Current links</h4>
            <ol className="profileLink__list">
            {
                links?.map((link) => {
                        return <> 
                            <li key={link.id}>
                                <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
                                <ArrowUpwardIcon onClick={() => changeLinkOrder('up', link.id)}/>
                                <ArrowDownwardIcon onClick={() => changeLinkOrder('down', link.id)}/>
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