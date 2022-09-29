import React, { useState } from 'react';
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

        //Auth.login(data.addUser.token);
        //window.location.pathname('/')

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
