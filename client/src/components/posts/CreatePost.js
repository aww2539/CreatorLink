import axios from "axios"
import { useHistory } from "react-router"
import { useState } from "react/cjs/react.development"
import { getCurrentUser } from "../../utils/apiManager"
import "../mainfeed/Feed.css"


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
        }

        axios.post(`http://localhost:4000/api/posts`, postData)
            .then(() => {
                history.push("/home")
            })
    }


    return (
        <>
            <section className="newPost__form">
                <button className="newPost" onClick={() => {history.push("/home")}}>Cancel</button>
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
                        <button className="newPost" onClick={saveNewPost}>
                            Post!
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}