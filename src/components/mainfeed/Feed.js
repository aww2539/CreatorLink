import { useEffect, useState } from "react"
import { getPosts } from "../../ApiManager"
import "./Feed.css"


export const NewsFeed = () => {
    const [posts, updatePosts] = useState([])

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
                {
                    posts.map((post) => {
                        return <section key={`post--${post.id}`}>
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