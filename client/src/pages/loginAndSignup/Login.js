import React, {useState} from "react";
import { Link } from 'react-router-dom';
import "./style.css";

function Login() {
    const [formState, setFormState] = useState({ email: '', password: '' });

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        //fetch call

        //Auth.login(data.login.token);

        setFormState({
            email: '',
            password: '',
        });
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
        <>
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
        </>
    )
}

export default Login;