import React, { useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
    const [user, setUser] = useState({})
    const conflictDialog = useRef()

    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
            .then(user => !!user.length)
    }
    const handleRegister = (e) => {
        e.preventDefault()
        existingUserCheck()
            .then((userExists) => {
                if (!userExists) {
                    fetch("http://localhost:8088/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(user)
                    })
                        .then(res => res.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("creatorLink_user", createdUser.id)
                                const newProfile = { userId: createdUser.id, bio: "" }
                        
                                const fetchOption = {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify(newProfile)
                                }
                        
                                return fetch("http://localhost:8088/profiles", fetchOption)
                                        .then(() => { history.push("/") })
                                
                            }
                        })


                    
                }
                else {
                    conflictDialog.current.showModal()
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
                <fieldset>
                    <label htmlFor="email"> Password </label>
                    <input onChange={updateUser} type="password" id="password" className="form-control" placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="address"> Name </label>
                    <input onChange={updateUser} type="text" id="name" className="form-control" placeholder="Enter your name" required />
                </fieldset>
                <fieldset>
                    <Link className="cancel__button" to={`/login`}><button>Cancel</button></Link>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

