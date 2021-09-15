

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

        return fetch(`http://localhost:8088/follows`, fetchOption)
    },

    unfollowUser(id) {

        return fetch(`http://localhost:8088/follows/${id}`, {
            method: "DELETE"
        })

    }

}