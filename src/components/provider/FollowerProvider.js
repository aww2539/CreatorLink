import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const FollowerContext = createContext()

// This component establishes what data can be used.
export const FollowerProvider = (props) => {
    const [follows, setFollows] = useState([])

    const getFollows = (id) => {
        return fetch(`http://localhost:8088/follows?userId=${id}`)
        .then(res => res.json())
        .then(setFollows)
    }

    const followUser = (userId, idOfUserFollowed) => {

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
    }

    const unfollowUser = (id) => {

        return fetch(`http://localhost:8088/follows/${id}`, {
            method: "DELETE"
        })

    }

    /*
        You return a context provider which has the
        `animals` state, `getAnimals` function,
        and the `addAnimal` function as keys. This
        allows any child elements to access them.
    */

    return (
        <FollowContext.Provider value={{
            follows, getFollows, followUser, unfollowUser
        }}>
            {props.children}
        </FollowContext.Provider>
    )
}
