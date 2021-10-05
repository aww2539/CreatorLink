

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

        return fetch(`https://creator-link-api-wod88.ondigitalocean.app/profiles/${profileId}`, profileData)
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

        return fetch(`https://creator-link-api-wod88.ondigitalocean.app/profileLinks/${linkId}`, linkData)
    }

}