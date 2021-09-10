import React from "react"
import { Route } from "react-router-dom"
import { getCurrentUser } from "./ApiManager"
import { NewsFeed } from "./components/mainfeed/Feed"
import { MyProfile } from "./components/profiles/MyProfile"
import { Search } from "./components/search/Search"

export const ApplicationViews = () => {
    const userId = getCurrentUser()
    return (
        <>
            <Route path="/home">
                <NewsFeed />
            </Route>

            <Route exact path={`/profile/${userId}`}>
                <MyProfile />
            </Route>

            <Route exact path="/search">
                <Search />
            </Route>
        </>
    )
}
