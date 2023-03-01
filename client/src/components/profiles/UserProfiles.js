import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom";
import { getCurrentUserId } from "../../utils/apiManager"
import { FollowerContext } from "../providers/FollowerProvider";
import "./Profiles.css"

export const UserProfile = () => {
    const { 
        follows, 
        getFollows, 
        followers, 
        getFollowers, 
        followCheck, 
        checkForFollow, 
        followUser, 
        unfollowUser
    } = useContext(FollowerContext)
    const [profile, setProfile] = useState({})
    const [links, setLinks] = useState([])

    const currentUserId = getCurrentUserId()
    const { profileId } = useParams()


    const getAndSetProfileAndLinks = () => {
        axios.get(`http://localhost:4000/api/profiles/${profileId}`)
            .then(({data}) => {
                setProfile(data)
                setLinks(data.profileLinks)
            })
    }
    

    useEffect(() => {
        getAndSetProfileAndLinks()
        getFollows(profileId)
        getFollowers(profileId)
        },[profileId]
    )

    useEffect(() => {
        checkForFollow(profileId)
        },[profileId, followers]
    )

    const handleAnalytics = (linkId) => {
        axios.put(`http://localhost:4000/api/profile_links/${linkId}/add_click`)
    }

    return (
        <>
        <article className="profile">
            {currentUserId === profile.userId && (
                <div className="profile__buttons">
                    <Link className="edit__button" to={`/profile/${profileId}/edit`}><button>Edit Profile</button></Link>
                    <Link className="analytics__button" to={`/profile/${profileId}/analytics`} ><button>Analytics</button></Link>
                </div>
            )}


            { profileId != currentUserId && (
                followCheck.id
                ? (
                    <button className="follow__button" onClick={() => {unfollowUser(followCheck.id, profileId)}}>
                        Unfollow
                    </button>
                ) : (
                        <button className="follow__button" onClick={() => {followUser(currentUserId, profileId)}}>
                            Follow
                        </button>
                    )
            )}

            <h2>Welcome to {profile.user?.firstName}'s CreatorLink!</h2>
            
            <h4>{profile.bio}</h4>

            <div className="follow__counts">
                <p>Following: {follows.length}</p><p>Followers: {followers.length}</p>
            </div>

            <section className="profile__links">
                {
                    links?.map((link) => {
                        return (
                            <div key={`link--${link.id}`} className="profile__links">
                                <h3>{link.name}</h3>
                                <p>{link.description}</p>
                                <a href={link.url} target="_blank" rel="noreferrer" onClick={() => handleAnalytics(link.id)} >
                                    {link.url}
                                </a>
                            </div>
                        )
                    })
                        
                }
            </section>
        </article>

        </>
    )
}
