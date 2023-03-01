import axios from "axios"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import "../mainfeed/Feed.css"

export const EditPost = () => {
    const [post, updatePost] = useState({
        body: ""
    })
    const { postId } = useParams()
    const history = useHistory()

    useEffect( () => {
        axios.get(`http://localhost:4000/api/posts/${postId}`)
            .then(({ data }) => {updatePost(data)})
    },[postId]
    )

    const savePost = (event) => {
        event.preventDefault()

        axios.put(`http://localhost:4000/api/posts/update/${postId}`, post)
            .then(() => {
                history.push("/home")
            })
    }

    return (

        <>
            <section className="editPost__form">

                <h3>Editing {post.user?.name}'s Post!</h3>
                    <div>
                        <label htmlFor="body">Edit Post:</label>
                        <input
                            onChange = {
                                (evt) => {
                                    const copy = {...post}
                                    copy.body = evt.target.value
                                    updatePost(copy)
                                }
                            }
                            required autoFocus
                            type="text"
                            className="form-control"
                            defaultValue={post.body}
                        />
                    </div>
                <div className="editPost__buttons">
                    <button className="btn btn-primary"  onClick={() => history.push("/home")}>Cancel</button>
                    <button className="btn btn-primary"  onClick={savePost}>Update</button>
                </div>
            </section>
        </>
    )

}