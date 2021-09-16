import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getCurrentUser, getFollowCheck, getFollowCount, getProfileLinks, getUsernamesForEmbeddedFeeds } from "../../ApiManager"
import { CloudinaryContext, Image } from 'cloudinary-react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import Follow from "./Follow";
import "./Profiles.css"


export const UserProfile = () => {
    const [profile, setProfile] = useState({})
    const [links, updateLinks] = useState([])

    const [followers, updateFollowers] = useState([])
    const [following, updateFollowing] = useState([])
    const [followingCheck, updateFollowingCheck] = useState([])
    const [followCheckState, setFollowCheckState] = useState()
    const [unfollowObject, setUnfollowObject] = useState({})

    const currentUser = getCurrentUser()
    const { profileId } = useParams()
    
    const [embed, updateEmbed] = useState({})

    useEffect(
        () => {
            return fetch(`http://localhost:8088/profiles/${profileId}?_expand=user`)
                .then(response => response.json())
                .then((data) => {
                    setProfile(data)
                })

        },
        [profileId]
    )

    useEffect(() => {
        getProfileLinks(profileId)
        .then((data => {updateLinks(data)}))
    },[profileId]
    )

    const updateProfileFollowerCount = () => {
        getFollowCount(profileId)
        .then((data) => {updateFollowers(data)})
    }

    const updateProfileFollowingCount = () => {
        getFollowCheck(profileId)
        .then((data) => {updateFollowing(data)})
    }

    useEffect(() => {
        getUsernamesForEmbeddedFeeds(profileId)
        .then((data => {updateEmbed(...data)}))
    },[profile]
    )

    useEffect(() => {
        updateProfileFollowerCount()
    },[profile])

    useEffect(() => {
        updateProfileFollowingCount()
    },[profile])

    useEffect(() => {
        getFollowCheck(currentUser)
        .then((data) => {updateFollowingCheck(data)})
    },[followers])

    useEffect(() => {
        const followCheck = !!followingCheck.find(f => f.userId === parseInt(currentUser) && f.idOfUserFollowed === parseInt(profileId))
        setFollowCheckState(followCheck)
    },[followingCheck])

    useEffect(() => {
        const unfollow = followingCheck.find(f => f.userId === parseInt(currentUser) && f.idOfUserFollowed === parseInt(profileId))
        setUnfollowObject(unfollow)
    },[followingCheck])

    return (
        <>
        <article className="profile">

            { followCheckState === true ?

                <button className="follow__button" onClick={() => {
                    Follow.unfollowUser(parseInt(unfollowObject?.id))
                    .then(() => {updateProfileFollowerCount()})}}
                    >Unfollow</button>

                : <button className="follow__button" onClick={() => {
                    Follow.followUser(parseInt(currentUser), parseInt(profileId))
                    .then(() => {updateProfileFollowerCount()})}}
                    >Follow</button>
            }

            <h2>Welcome to {profile.user?.name}'s CreatorLink!</h2>

            <CloudinaryContext cloudName="creatorlink">
                <div>
                    <Image publicId="sample" width="50" />
                </div>
            </CloudinaryContext>
            
            <h4>{profile.bio}</h4>

            <div className="follow__counts">
                <p>Following: {following.length}</p><p>Followers: {followers.length}</p>
            </div>

            <section className="profile__links">
                {
                    links.map((link) => {
                        {
                        return <div key={`link--${link.id}`} className="profile__links">
                                <h3>{link.title}</h3>
                                <p>{link.description}</p>
                                <a href={link.url} target="_blank">{link.url}</a>
                                {embed !== undefined && link.title === "Twitter" ? 
                                    <TwitterTimelineEmbed
                                    sourceType="profile"
                                    screenName={`${embed.twitter}`}
                                    options={{height: 400}}
                                    />
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
