import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { getCurrentUser, getPosts } from "../../ApiManager"
import "./Feed.css"


export const NewsFeed = () => {
    const [posts, updatePosts] = useState([])
    const currentUser = getCurrentUser()
    const history = useHistory()

    const fetchPosts = () => {
        getPosts()
        .then((posts) => {updatePosts(posts)})
    }

    useEffect( 
        () => {
            fetchPosts()
        },
        []
    )

    const deletePost = (id) => {
        fetch(`http://localhost:8088/posts/${id}`, {
            method: "DELETE"
        })
        .then(fetchPosts)
    }


    return (
        <>
            <article className="newsFeed">
            <div>
                <button onClick={() => history.push("/home/create")}>Create Post</button>
            </div>
                {
                    posts.map((post) => {
                        return <section className="feed__post" key={`post--${post.id}`}>
                                {post.userId === parseInt(currentUser) ? <button className="btn btn-primary" onClick={() => {deletePost(post.id)}}>Delete</button> : ""}
                                <h3>{post.user?.name}</h3>
                                <p>{post.body}</p>
                                <p>Posted at {post.createdAt}</p>
                            </section>
                    })
                }
            </article>
        </>
    )
}