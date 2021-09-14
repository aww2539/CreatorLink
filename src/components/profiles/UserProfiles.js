import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getProfileLinks } from "../../ApiManager"
import { CloudinaryContext, Image } from 'cloudinary-react';


export const UserProfile = () => {
    const [profile, setProfile] = useState({})
    const [links, updateLinks] = useState([])
    const { profileId } = useParams()
    

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
    
    return (
        <>

        <article className="profile">
            <h2>Welcome to {profile.user?.name}'s CreatorLink!</h2>

            <CloudinaryContext cloudName="creatorlink">
                <div>
                    <Image publicId="sample" width="50" />
                </div>
            </CloudinaryContext>
            
            <h4>{profile.bio}</h4>

            <section className="profile__links">
                {
                    links.map((link) => {
                        {
                        return <div key={`link--${link.id}`}>
                                <h3>{link.title}</h3>
                                <p>{link.description}</p>
                                <a href={link.url} target="_blank">{link.url}</a>
                            </div>
                        }
                    })
                        
                }
            </section>
        </article>

        </>
    )
}
