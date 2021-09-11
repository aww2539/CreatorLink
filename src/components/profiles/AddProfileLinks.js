import { useState } from "react/cjs/react.development";
import { getCurrentUser } from "../../ApiManager";


export const AddLinksForm = () => {
    const [link, updateLink] = useState({
        show: true,
        title: "",
        url: "",
        description: "",
    });
    const idOfProfile = getCurrentUser()


    const saveLink = (event) => {
        event.preventDefault()

        const newLink = {
            profileId: parseInt(idOfProfile),
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
    }

    return (
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
    )
}