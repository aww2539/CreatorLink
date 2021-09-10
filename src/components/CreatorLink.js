import { Nav } from "./nav/Nav"
import { QuickAccess } from "./nav/QuickAccess"
import "./CreatorLink.css"
import { ApplicationViews } from "../ApplicationViews"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { Redirect, Route } from "react-router"


export const CreatorLink = () => {

    return (
        <>
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
                            <QuickAccess />
                            <ApplicationViews />
                        </main>
                    </>
            );
            } else {
                return <Redirect to="/login" />
            }
            }}
        />

        <Route path="/login">
            <Login />
        </Route>
        <Route path="/register">
            <Register />
        </Route>

        </>
    )
}
