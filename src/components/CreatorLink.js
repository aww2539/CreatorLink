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
                            <main id="mainContainer">
                                <article className="nav">
                                    <Nav />
                                </article>
                                <article className="application">
                                    <div className="header">
                                        <h2>CreatorLink</h2>
                                    </div>
                                    <ApplicationViews />
                                </article>
                                <article className="quick__access">
                                    <QuickAccess />
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
