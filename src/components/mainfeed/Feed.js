import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { getPosts } from "../../ApiManager"
import "./Feed.css"


export const NewsFeed = () => {
    const [posts, updatePosts] = useState([])
    const history = useHistory()

    useEffect( 
        () => {
            return getPosts()
            .then((posts) => {updatePosts(posts)})
        },
        []
    )

    return (
        <>
            <article className="newsFeed">
            <div>
                <button onClick={() => history.push("/posts/create")}>Create Post</button>
            </div>
                {
                    posts.map((post) => {
                        return <section className="feed__post" key={`post--${post.id}`}>
                                <h3>{post.user.displayName}</h3>
                                <p>{post.body}</p>
                                <p>Posted at {post.timestamp}</p>
                            </section>
                    })
                }
            </article>
        </>
    )
}