import React, { useState } from 'react';

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
        <div className="login-container">
            <h2>Signup</h2>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="username">User name:</label>
                <div className="">
                    <input
                        placeholder="user name"
                        name="username"
                        type="username"
                        id="username"
                        onChange={handleChange}
                    />
                </div>
                <label htmlFor="email">Email:</label>
                <div className="">
                    <input
                        placeholder="youremail@test.com"
                        name="email"
                        type="email"
                        id="email"
                        onChange={handleChange}
                    />
                </div>
                <label htmlFor="pwd">Password:</label>
                <div className="">
                    <input
                        placeholder="******"
                        name="password"
                        type="password"
                        id="pwd"
                        onChange={handleChange}
                    />
                </div>
                <div className="">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Signup;
