import { useContext, useEffect, useRef, useState } from "react"
import { useParams } from "react-router"
import { getCurrentUser, getProfileLinks, getUsernamesForEmbeddedFeeds } from "../../ApiManager"
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import "./Profiles.css"
import Analytics from "./analytics/Analytics";
import { FollowerContext } from "../provider/FollowerProvider";





export const UserProfile = () => {
    const [profile, setProfile] = useState({})
    const [links, updateLinks] = useState([])
    const [embed, updateEmbed] = useState({})
    const currentUser = getCurrentUser()
    const { profileId } = useParams()
    const youtubeSubscribeNode = useRef()

    const { followings, getFollowings, followers, getFollowers, getQuickAccessFollowings, followUser, unfollowUser } = useContext(FollowerContext)

    const [followCheckState, setFollowCheckState] = useState({})
    

    useEffect(
        () => {
            return fetch(`http://localhost:8088/profiles/${profileId}?_expand=user`)
                .then(response => response.json())
                .then((data) => {
                    setProfile(data)
                })
        },[profileId]
    )

    useEffect(() => {
        const youtubescript = document.createElement("script");
        youtubescript.src = "https://apis.google.com/js/platform.js";
        youtubescript.async = true
        document.body.appendChild(youtubescript);
    }, [profileId])

    const fetchLinks = () => {
        getProfileLinks(profileId)
        .then((data => {updateLinks(data)}))
    }

    useEffect(() => {
        fetchLinks()
    },[profileId]
    )
    
    useEffect(() => {
        getUsernamesForEmbeddedFeeds(profileId)
        .then((data => {updateEmbed(...data)}))
    },[profileId]
    )

    const updateProfileFollowerCount = () => { return getFollowers(profileId) }

    const updateProfileFollowingCount = () => { return getFollowings(profileId) }

    useEffect(() => {
        updateProfileFollowerCount()
    },[profileId])

    useEffect(() => {
        updateProfileFollowingCount()
    },[profileId])

    useEffect(() => {
        const followCheck = followers.find(f => f.userId === parseInt(currentUser) && f.idOfUserFollowed === parseInt(profileId))
        if (followCheck !== undefined) {
            setFollowCheckState(followCheck)
            
        } else {
            setFollowCheckState(undefined)
        }
    },[followers])

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
        <article className="profile">

            { 
                profileId !== currentUser ?
                
                        followCheckState !== undefined ?

                        <button className="follow__button" onClick={() => {
                            unfollowUser(parseInt(followCheckState?.id))
                            .then(() => {
                                updateProfileFollowerCount()
                                .then(() => getQuickAccessFollowings(currentUser))
                            })}}
                            >Unfollow</button>

                        : <button className="follow__button" onClick={() => {
                            followUser(parseInt(currentUser), parseInt(profileId))
                            .then(() => {
                                updateProfileFollowerCount()
                                .then(() => getQuickAccessFollowings(currentUser))
                            })}}
                            >Follow</button>
                : ""
            }

            <h2>Welcome to {profile.user?.name}'s CreatorLink!</h2>
            
            <h4>{profile.bio}</h4>

            <div className="follow__counts">
                <p>Following: {followings.length}</p><p>Followers: {followers.length}</p>
            </div>

            <section className="profile__links">
                {
                    links.map((link) => {
                        {
                        return <div key={`link--${link.id}`} className="profile__links">
                                <h3>{link.title}</h3>
                                <p>{link.description}</p>
                                <a href={link.url} target="_blank" onClick={() => {
                                        Analytics.addLinkClick(link.id, link.clicks)
                                        .then(() => {fetchLinks()})}}>
                                    {link.url}
                                </a>
                                {embed !== "" && link.url.startsWith("https://www.twitter") ? 
                                    <TwitterTimelineEmbed
                                    sourceType="profile"
                                    screenName={`${embed.twitter}`}
                                    options={{height: 400}}
                                    />
                                    : ""
                                }

                                {
                                    embed !== "" && link.url.startsWith("https://www.youtube") ? 
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
