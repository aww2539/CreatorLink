import axios from "axios"
import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import { getCurrentUser, getPosts } from "../../utils/apiManager"
import dateConverter from "../../utils/dataConverter"
import "./Feed.css"


export const NewsFeed = () => {
    const [posts, updatePosts] = useState([])
    const currentUser = getCurrentUser()
    const history = useHistory()

    const getAndSetPosts = () => {
        getPosts().then(updatePosts)
    }

    const deletePost = (id) => {
        axios.delete(`http://localhost:4000/api/posts/delete/${id}`)
            .then(getAndSetPosts)
    }

    useEffect(() => { getAndSetPosts() }, [])

    return (
        <>
            <article className="newsFeed">
            <section className="createPost__button">
                <button onClick={() => history.push("/home/create")}>Create Post</button>
            </section>
                {
                    posts?.map((post) => {
                        return <section className="feed__post" key={`post--${post.id}`}>
                                <Link to={`/profile/${post.user.id}`}>
                                    <h4>{post.user?.firstName} {post.user?.lastName}</h4>
                                </Link>
                                <p>{post.body}</p>
                                {post.updatedAt ? <p>Updated at {dateConverter(post.updatedAt)}</p> : <p>Posted at {dateConverter(post.insertedAt)}</p>}

                                {post.user.id === parseInt(currentUser) ? 
                                <>
                                    <div className="postButtons">
                                    <button onClick={() => history.push(`/home/post/edit/${post.id}`)}>Edit</button>
                                    <button className="btn btn-primary" onClick={() => {deletePost(post.id)}}>Delete</button>
                                    </div>
                                </> 
                                : ""}
                                
                            </section>
                    })
                }
            </article>
        </>
    )
}