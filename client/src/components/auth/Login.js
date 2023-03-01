import React, { useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';

import "./Login.css"

export const Login = () => {
    const [credentials, setCredentials] = useState({})
    const existDialog = useRef()
    const history = useHistory()

    const handleLogin = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:4000/api/users/login`, credentials)
            .then(({data}) => {
                if (data.id) {
                    localStorage.setItem("creatorLink_user", data.id)
                    history.push("/")
                } else {
                    existDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>

            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>CreatorLink</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            onChange = {
                                (evt) => {
                                    const copy = {...credentials}
                                    copy.email = evt.target.value
                                    setCredentials(copy)
                                }
                            }
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword"> Password </label>
                        <input type="password"
                            onChange = {
                                (evt) => {
                                    const copy = {...credentials}
                                    copy.password = evt.target.value
                                    setCredentials(copy)
                                }
                            }
                            className="form-control"
                            placeholder="Password"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                    <div className="link--register">
                        <Link to="/register">Not a member yet?</Link>
                    </div>
                </form>
            </section>
        </main>
    )
}

