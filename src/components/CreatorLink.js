import { Nav } from "./nav/Nav"
import { QuickAccess } from "./nav/QuickAccess"
import "./CreatorLink.css"
import { ApplicationViews } from "../ApplicationViews"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { Redirect, Route } from "react-router"
import { FollowerProvider } from "./provider/FollowerProvider"


export const CreatorLink = () => {
    

    return (
        <>
        <FollowerProvider>
            <Route
                render={() => {
                if (localStorage.getItem("creatorLink_user")) {
                    return (
                        <>
                            <Nav />
                            <header>
                                <h1>CreatorLink</h1>
                            </header>
                            <main id="mainContainer">
                                <article className="quick__access">
                                    <QuickAccess />
                                </article>
                                <article className="application">
                                    <ApplicationViews />
                                </article>
                            </main>
                        </>
                );
                } else {
                    return <Redirect to="/login" />
                }
                }}
            />            
        </FollowerProvider>

        <Route path="/login">
            <Login />
        </Route>
        <Route path="/register">
            <Register />
        </Route>

        </>
    )
}
