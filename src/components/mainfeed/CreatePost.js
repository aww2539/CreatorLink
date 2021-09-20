import { useHistory } from "react-router"
import { useState } from "react/cjs/react.development"
import { getCurrentUser } from "../../ApiManager"
import "./Feed.css"


export const CreatePost = () => {
    const [newPost, updateNewPost] = useState({
        body: ""
    })
    const currentUser = getCurrentUser()
    const history = useHistory()

    const saveNewPost = (event) => {
        event.preventDefault()

        const postData = {
            userId: parseInt(currentUser),
            body: newPost.body,
            createdAt: Date.now(),
            edited: false
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        }

        return fetch(`http://localhost:8088/posts`, fetchOption)
        .then(() => {
            history.push("/home")
        })
    }


    return (
        <>
            <section className="newPost__form">
                <button className="btn btn-primary" onClick={() => {history.push("/home")}}>Cancel</button>
                <h2>New Post?</h2>
                <div>
                    <form className="newPost">
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="newPost">What would you like to post?</label>
                                <input
                                    onChange = {
                                        (evt) => {
                                            const copy = {...newPost}
                                            copy.body = evt.target.value
                                            updateNewPost(copy)
                                        }
                                    }
                                    required autoFocus
                                    type="textarea"
                                    className="form-control"
                                    placeholder="New Post..."
                                />
                            </div>
                        </fieldset>
                        <button className="btn btn-primary" onClick={saveNewPost}>
                            Post!
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}