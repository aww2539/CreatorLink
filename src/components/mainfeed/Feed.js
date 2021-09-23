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
        fetch(`https://creator-link-api-wod88.ondigitalocean.app/posts/${id}`, {
            method: "DELETE"
        })
        .then(fetchPosts)
    }

    const dateConverter = (timestamp) => {
        let date = new Date(timestamp)
        return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
    }


    return (
        <>
            <article className="newsFeed">
            <section className="createPost__button">
                <button onClick={() => history.push("/home/create")}>Create Post</button>
            </section>
                {
                    posts.map((post) => {
                        return <section className="feed__post" key={`post--${post.id}`}>
                                <h3>{post.user?.name}</h3>
                                <p>{post.body}</p>
                                {post.edited === false ? <p>Posted at {dateConverter(post.createdAt)}</p> : <p>Edited at {dateConverter(post.createdAt)}</p>}

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