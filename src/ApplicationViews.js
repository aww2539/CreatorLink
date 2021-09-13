import React from "react"
import { Route } from "react-router-dom"
import { getCurrentUser } from "./ApiManager"
import { CreatePost } from "./components/mainfeed/CreatePost"
import { NewsFeed } from "./components/mainfeed/Feed"
import { EditProfile } from "./components/profiles/EditProfiles"
import { MyProfile } from "./components/profiles/MyProfile"
import { Search } from "./components/search/Search"

export const ApplicationViews = () => {
    const userId = getCurrentUser()
    return (
        <>
            <Route exact path="/home">
                <NewsFeed />
            </Route>
                    <Route exact path="/home/create">
                        <CreatePost />
                    </Route>

            <Route exact path={`/profile/${userId}`}>
                <MyProfile />
            </Route>
                    <Route exact path={`/profile/${userId}/edit`}>
                        <EditProfile />
                    </Route>

            <Route exact path="/search">
                <Search />
            </Route>
        </>
    )
}
