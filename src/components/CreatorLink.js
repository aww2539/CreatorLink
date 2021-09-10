import { Nav } from "./nav/Nav"
import { QuickAccess } from "./nav/QuickAccess"
import "./CreatorLink.css"
import { ApplicationViews } from "../ApplicationViews"
import { NewsFeed } from "./mainfeed/Feed"


export const CreatorLink = () => {

    return (
        <>
            <Nav />
            <header>
                <h1>CreatorLink</h1>
            </header>
            <main id="mainContainer">
                <QuickAccess />
                <NewsFeed />
                <ApplicationViews />
            </main>
        </>
    )
}