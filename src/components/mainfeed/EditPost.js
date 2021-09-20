import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import "./Feed.css"


export const EditPost = () => {
    const [post, updatePost] = useState({
        body: ""
    })
    const { postId } = useParams()
    const history = useHistory()

    useEffect( () => {
            return fetch(`http://localhost:8088/posts/${postId}?_expand=user`)
                .then(response => response.json())
                .then((data) => {updatePost(data)})
    },[]
    )

    const savePost = (event) => {
        event.preventDefault()

        const fetchOption = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                body: post.body,
                createdAt: Date.now(),
                edited: true
            })
        }

        return fetch(`http://localhost:8088/posts/${postId}`, fetchOption)
                .then(() => { history.push("/home") })
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