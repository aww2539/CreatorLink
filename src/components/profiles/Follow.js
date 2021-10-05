

export default {

    followUser(userId, idOfUserFollowed) {

        const followData = {
            userId: userId,
            idOfUserFollowed: idOfUserFollowed
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(followData)
        }

        return fetch(`https://creator-link-api-wod88.ondigitalocean.app/follows`, fetchOption)
    },

    unfollowUser(id) {

        return fetch(`https://creator-link-api-wod88.ondigitalocean.app/follows/${id}`, {
            method: "DELETE"
        })

    }

}