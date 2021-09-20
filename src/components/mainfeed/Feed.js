import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
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
            <div className="createPost">
                <button onClick={() => history.push("/home/create")}>Create Post</button>
            </div>
                {
                    posts.map((post) => {
                        return <section className="feed__post" key={`post--${post.id}`}>
                                <h3>{post.user?.name}</h3>
                                <p>{post.body}</p>
                                {post.edited === false ? <p>Posted at {post.createdAt}</p> : <p>Edited at {post.createdAt}</p>}

                                {post.userId === parseInt(currentUser) ? 
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