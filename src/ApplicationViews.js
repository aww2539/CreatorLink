import React from "react"
import { Route } from "react-router-dom"
import { getCurrentUser } from "./ApiManager"
import { CreatePost } from "./components/mainfeed/CreatePost"
import { EditPost } from "./components/mainfeed/EditPost"
import { NewsFeed } from "./components/mainfeed/Feed"
import { EditProfile } from "./components/profiles/edit_profiles/EditProfiles"
import { MyProfile } from "./components/profiles/MyProfile"
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
                    </Route>
                    <Route exact path="/home/post/edit/:postId(\d+)">
                        <EditPost />
                    </Route>

            <Route exact path="/profile/:profileId(\d+)">
                <UserProfile />
            </Route>

            <Route exact path={`/profile/My${userId}`}>
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
