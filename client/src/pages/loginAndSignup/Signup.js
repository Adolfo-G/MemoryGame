import React, { useState } from 'react';
import Auth from "../../utils/auth";
import "./style.css";

function Signup() {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        //fetch call
        if (formState.email !== '' && formState.password !== '' && formState.username !== "") {
            try {
                async function signupUser(url = '', data = {}) {
                    const response = await fetch(url, {
                        method: 'POST',
                        mode: 'cors',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    });
                    if (!response.ok) {
                        console.log("response failed")
                        alert("invalid email / password or given email may already have an account")
                    }
                    return response.json();
                }

                signupUser('http://localhost:3001/api/users/signup', { ...formState })
                    .then((data) => {
                        if (data.token) {
                            setFormState({
                                email: '',
                                password: '',
                                username: '',
                            });
                            Auth.login(data.token)
                        }
                    })
                    .catch((err) => alert("There was an issue creating an account. Please try again"))

            } catch { alert("There was an issue creating an account. Please try again") }
        } else { alert("Missing field data") }


    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };
    return (
        <div className="loginAndSignup">
            <div className="login-wrapper">
                <form className='form' onSubmit={handleFormSubmit}>
                    <h2>Signup</h2>
                    <label htmlFor="username">User name:</label>
                    <div className="input-group">
                        <input
                            placeholder="user name"
                            name="username"
                            type="username"
                            id="username"
                            onChange={handleChange}
                        />
                    </div>
                    <label htmlFor="email">Email:</label>
                    <div className="input-group">
                        <input
                            placeholder="youremail@test.com"
                            name="email"
                            type="email"
                            id="email"
                            onChange={handleChange}
                        />
                    </div>
                    <label htmlFor="pwd">Password:</label>
                    <div className="input-group">
                        <input
                            placeholder="******"
                            name="password"
                            type="password"
                            id="pwd"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="">
                        <button className='submit-btn' type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
