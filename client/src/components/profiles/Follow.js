

const followAndUnfollow =  {

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

        return fetch(`http://localhost:4000/api/follows`, fetchOption)
    },

    unfollowUser(id) {

        return fetch(`http://localhost:4000/api/follows/${id}`, {
            method: "DELETE"
        })

    }

}

export default followAndUnfollow