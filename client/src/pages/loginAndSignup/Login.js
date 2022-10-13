import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Auth from "../../utils/auth";
import "./style.css";

function Login() {
    const [formState, setFormState] = useState({ email: '', password: '' });

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        //fetch call
        if (formState.email!==''&&formState.password!=='') {
            try {
                async function createUser(url = '', data = {}) {
                    const response = await fetch(url, {
                        method: 'POST',
                        mode: 'cors',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    });
                    if (!response.ok) {
                        console.log("response failed")
                        alert("invalid email / password")
                    }
                    return response.json();
                }

                createUser('http://localhost:3001/api/users/login', { ...formState })
                    .then((data) => {
                        if(data.token){
                            setFormState({
                                email: '',
                                password: '',
                            });
                            Auth.login(data.token)
                        }
                    })
                    .catch((err)=>alert("username/password is incorrect"))
            } catch {alert("username/password is incorrect")}
        }else{alert("Missing email /password")}

    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <>
            <div className="loginAndSignup">
                <div className="login-wrapper">
                    <form className="form" onSubmit={handleFormSubmit}>
                        <h2>Login</h2>
                        <label htmlFor="email">Email</label>
                        <div className="input-group">
                            <input
                                placeholder="email"
                                name="email"
                                type="email"
                                id="email"
                                onChange={handleChange}
                            />
                        </div>
                        <label htmlFor="pwd">Password</label>
                        <div className="input-group">
                            <input
                                placeholder="******"
                                name="password"
                                type="password"
                                id="pwd"
                                onChange={handleChange}
                            />
                        </div>
                        <button className="submit-btn">Submit</button>
                        <Link to="/signup"><button className="signup" id="signup">Signup</button></Link>
                    </form>

                </div>
            </div>
        </>
    )
}

export default Login;