import React, { useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import axios from 'axios';
import "./Login.css"

export const Register = () => {
    const [user, setUser] = useState({})
    const conflictDialog = useRef()

    const history = useHistory()

    const handleRegister = (e) => {
        console.log(user)
        e.preventDefault()
        axios.post("http://localhost:4000/api/users/create_user", user)
            .then(({ data }) => {
                if (data.id) {
                    localStorage.setItem("creatorLink_user", data.id)
                    history.push("/")
                }
            })
    }

    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }


    return (
        <main style={{ textAlign: "center" }}>
            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">CreatorLink Registration</h1>
                <fieldset>
                    <label htmlFor="name"> Email </label>
                    <input onChange={updateUser}
                           type="text" id="email" className="form-control"
                           placeholder="Enter your email" required autoFocus />
                </fieldset>
                {/* <fieldset>
                    <label htmlFor="email"> Password </label>
                    <input onChange={updateUser} type="password" id="password" className="form-control" placeholder="Password" required />
                </fieldset> */}
                <fieldset>
                    <label htmlFor="address"> First Name </label>
                    <input onChange={updateUser} type="text" id="firstName" maxLength="25" className="form-control" placeholder="Enter your name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="address"> Last Name </label>
                    <input onChange={updateUser} type="text" id="lastName" maxLength="25" className="form-control" placeholder="Enter your name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="address"> Username </label>
                    <input onChange={updateUser} type="text" id="username" maxLength="25" className="form-control" placeholder="Enter your name" required />
                </fieldset>
                <fieldset>
                    <Link className="cancel__button" to={`/login`}><button>Cancel</button></Link>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

