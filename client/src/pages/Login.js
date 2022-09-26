import React, {useState} from "react";
import { Link } from 'react-router-dom'

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
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleFormSubmit}>
                    <label htmlFor="email">Email</label>
                    <div className="">
                        <input
                            placeholder="email"
                            name="email"
                            type="email"
                            id="email"
                            onChange={handleChange}
                        />
                    </div>
                    <label htmlFor="pwd">Password</label>
                    <div className="">
                        <input
                            placeholder="******"
                            name="password"
                            type="password"
                            id="pwd"
                            onChange={handleChange}
                        />
                    </div>
                    <button>Submit</button>
                </form>
                <Link to="/signup"><button>Signup</button></Link>
            </div>
        </>
    )
}

export default Login;