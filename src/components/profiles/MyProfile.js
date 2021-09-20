import React, { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { getCurrentUser, getFollowCheck, getFollowCount, getFollowedProfiles, getProfileLinks, getUsernamesForEmbeddedFeeds } from "../../ApiManager"
import "./Profiles.css"

export const MyProfile = () => {
    const [profile, setProfile] = useState({})
    const [links, updateLinks] = useState([])
    const [followerCount, updateFollowerCount] = useState([])
    const [followingCount, updateFollowingCount] = useState([])
    const [embed, updateEmbed] = useState({})
    const youtubeSubscribeNode = useRef()
    const userId = getCurrentUser()

    useEffect(
        () => {
            return fetch(`http://localhost:8088/profiles/${userId}?_expand=user`)
                .then(response => response.json())
                .then((data) => {
                    setProfile(data)
                })

        },
        []
    )

    useEffect(() => {
        getProfileLinks(userId)
        .then((data => {updateLinks(data)}))
    },[]
    )

    useEffect(() => {
        getFollowCount(userId)
        .then((data) => {updateFollowerCount(data)})
    },[])

    useEffect(() => {
        getFollowCheck(userId)
        .then((data) => {updateFollowingCount(data)})
    },[])

    useEffect(() => {
        getUsernamesForEmbeddedFeeds(userId)
        .then((data => {updateEmbed(...data)}))
    },[]
    )

    useEffect(() => {
        const youtubescript = document.createElement("script");
        youtubescript.src = "https://apis.google.com/js/platform.js";
        youtubescript.async = true
        document.body.appendChild(youtubescript);
    }, [])

    const createYouTubeButton = (embedId) => {
        const customAttributes = {
            "data-channelid": embedId,
            "data-layout": "default",
            "data-count": "default"
        }
    return <div className="g-ytsubscribe" ref={youtubeSubscribeNode} {...customAttributes}></div>

    }


    
    return (
        <>

        <Link className="edit__button" to={`/profile/My${userId}/edit`}><button>Edit Profile</button></Link>
        <article className="profile">
            <h2>Welcome to {profile.user?.name}'s CreatorLink!</h2>
            <h4>{profile.bio}</h4>

            <div className="follow__counts">
                <p>Following: {followingCount.length}</p><p>Followers: {followerCount.length}</p>
            </div>

            <section className="profile__links">
                {
                    links.map((link) => {
                        {
                        return <div key={`link--${link.id}`} className="profile__links">
                                <h3>{link.title}</h3>
                                <p>{link.description}</p>
                                <a href={link.url} target="_blank">{link.url}</a>

                                {embed !== undefined && link.url.startsWith("https://www.twitter") ? 
                                    <TwitterTimelineEmbed
                                    sourceType="profile"
                                    screenName={`${embed.twitter}`}
                                    options={{height: 400}}
                                    />
                                    : ""
                                }

                                {
                                    embed !== undefined && link.url.startsWith("https://www.youtube") ? 
                                    createYouTubeButton(embed.youtube)
                                    : ""
                                }

                            </div>
                        }
                    })
                        
                }
            </section>
        </article>

        </>
    )
}
