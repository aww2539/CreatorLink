

export default {

    addProfileClick(profileId, profileClicks) {

        const profileData = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                clicks: profileClicks + 1
            })
        }

        return fetch(`http://localhost:4000/api/profiles/${profileId}`, profileData)
    },

    addLinkClick(linkId, linkClicks) {

        const linkData = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                clicks: linkClicks + 1
            })
        }

        return fetch(`http://localhost:4000/api/profileLinks/${linkId}`, linkData)
    }

}