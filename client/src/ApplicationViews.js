import React from "react"
import { Route } from "react-router-dom"
import { getCurrentUser } from "./utils/apiManager"
import { CreatePost } from "./components/posts/CreatePost"
import { EditPost } from "./components/posts/EditPost"
import { NewsFeed } from "./components/mainfeed/Feed"
import { ProfileAnalytics } from "./components/profiles/analytics/ProfileAnalytics"
import { EditProfile } from "./components/profiles/edit_profiles/EditProfiles"
import { UserProfile } from "./components/profiles/UserProfiles"
import { Search } from "./components/search/Search"

export const ApplicationViews = () => {
    const userId = getCurrentUser()
    return (
        <>
            <Route exact path="/">
                <NewsFeed />
            </Route>
            <Route exact path="/home">
                <NewsFeed />
            </Route>
                    <Route exact path="/home/create">
                        <CreatePost />
                        <NewsFeed />
                    </Route>
                    <Route exact path="/home/post/edit/:postId">
                        <EditPost />
                        <NewsFeed />
                    </Route>

            <Route exact path="/profile/:profileId">
                <UserProfile />
            </Route>
                    <Route path="/profile/:profileId/edit">
                        <EditProfile />
                    </Route>
                    <Route exact path="/profile/:profileId/analytics">
                        <ProfileAnalytics />
                    </Route>

            <Route exact path="/search">
                <Search />
            </Route>
        </>
    )
}
