import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import { getCurrentUserId, getProfileLinks } from "../../utils/apiManager"
import "./Profiles.css"
import axios from "axios";
import { Link } from "react-router-dom";
// import { FollowerContext } from "../providers/FollowerProvider";

export const UserProfile = () => {
    const [profile, setProfile] = useState({})
    const [links, setLinks] = useState([])
    const currentUserId = getCurrentUserId()
    const { profileId } = useParams()

    // const { followings, getFollowings, followers, getFollowers, getQuickAccessFollowings, followUser, unfollowUser } = useContext(FollowerContext)

    // const [followCheckState, setFollowCheckState] = useState({})

    const getAndSetProfileAndLinks = () => {
        axios.get(`http://localhost:4000/api/profiles/${profileId}`)
            .then(({data}) => {
                setProfile(data)
                setLinks(data.profileLinks)
            })
    }
    

    useEffect(() => {
        getAndSetProfileAndLinks()
        },[profileId]
    )

    const handleAnalytics = (linkId) => {
        axios.put(`http://localhost:4000/api/profile_links/${linkId}/add_click`)
    }

    // const updateProfileFollowerCount = () => { return getFollowers(profileId) }

    // const updateProfileFollowingCount = () => { return getFollowings(profileId) }

    // useEffect(() => {
    //     updateProfileFollowerCount()
    // },[profileId])

    // useEffect(() => {
    //     updateProfileFollowingCount()
    // },[profileId])

    // useEffect(() => {
    //     const followCheck = followers.find(f => f.userId === parseInt(currentUser) && f.idOfUserFollowed === parseInt(profileId))
    //     if (followCheck !== undefined) {
    //         setFollowCheckState(followCheck)
            
    //     } else {
    //         setFollowCheckState(undefined)
    //     }
    // },[followers])


    return (
        <>
        <article className="profile">
            {currentUserId === profile.userId && (
                <div className="profile__buttons">
                    <Link className="edit__button" to={`/profile/${profileId}/edit`}><button>Edit Profile</button></Link>
                    <Link className="analytics__button" to={`/profile/${profileId}/analytics`} ><button>Analytics</button></Link>
                </div>
            )}


            {/* { followCheckState !== undefined ?

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
            } */}

            <h2>Welcome to {profile.user?.firstName}'s CreatorLink!</h2>
            
            <h4>{profile.bio}</h4>

            {/* <div className="follow__counts">
                <p>Following: {followings.length}</p><p>Followers: {followers.length}</p>
            </div> */}

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
