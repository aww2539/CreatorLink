import React from "react"
import { Route } from "react-router-dom"
import { CreatorLink } from "./components/CreatorLink"

export const ApplicationViews = () => {
    return (
        <>
            <Route path="/home">
                <CreatorLink />
            </Route>
        </>
    )
}
