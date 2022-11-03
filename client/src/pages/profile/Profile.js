import React, { useEffect, useState } from "react";
import './style.css'
import Auth from "../../utils/auth"

function authCheck() {
    if (Auth.loggedIn() === false) {
        return (
            <p className="logged-out-text">
                Please log in to view a profile 
            </p>
        );
    }
}

function Profile() {
    const email = Auth.getProfile().data.email
    const [profile, setProfile] = useState({})
    const [inputStyle, setInputStyle] = useState({ display: 'none' })
    const [newName, setNewName] = useState('')

    let ranks={
        1:"Bronze",
        2:"Silver",
        3:"Gold",
        4:"Platinum",
        5:"Diamond"
    }

    const getProfile = () => {
        async function fetchProfile() {
            try {
                let data = await fetch(`http://localhost:3001/api/users/profile/${email}`);
                return data
            } catch {
                console.log("data failed to load")
            }
        }
        fetchProfile()
            .then((res) => res.json())
            .then((data) => setProfile(data))
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getProfile()
    }, [])

    let exp = profile.experience
    let expMax = 1000
    let expRatio = (exp / expMax) * 100;
    let css = `
        #progressbar>div {
            width: ${expRatio}%;
        }
        `
    //edititng of user name
    function editVisibility() {
        if (inputStyle["display"] === 'none') {
            setInputStyle({ display: 'unset' })
        } else {
            setInputStyle({ display: 'none' })
        }
    }
    function updateUsername() {
        if (newName !== '') {
            try {
                async function editUsername(url = '', data = {}) {
                    const response = await fetch(url, {
                        method: 'PUT',
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

                editUsername('http://localhost:3001/api/users/updateUsername', { email: email, username: newName })
                    .then((data) => setProfile(data))
                    .catch((err) => alert("There was an issue editing your account. Please try again"))
            } catch {
                console.log("error editing username")
            }
        }
        else {
            console.log("error new username empty")
        }
    }

    const handleChange = (event) => {
        const { value } = event.target;
        setNewName(value);
    };

    return (
        <div className="profileBG">
            <div className="profileCard">
                <div className="profileName">
                    <h1 className="name">{profile.username}</h1>
                    <button className="edit-name-btn" onClick={() => editVisibility()}>Edit Username</button>
                    <form className="namechange-form" onSubmit={() => updateUsername()} style={inputStyle}>
                        <input
                            className="edit-username"
                            name="nameChange"
                            type="nameChange"
                            placeholder="enter new name"
                            onChange={handleChange}
                        />
                        <button className="submit-namechange">Submit</button>
                    </form>
                </div>
                <h2 className="profileRank profileInfo">Rank: {ranks[profile.rank] ? ranks[profile.rank] : "Diamond"}</h2>
                <h2 className="profileMaxHighscore profileInfo">Top HighScore: {profile.score}</h2>
                <h2 className="profileExp profileInfo">Experience: {exp}/{expMax}</h2>
                <div id="progressbar">
                    <div>
                        <style>{css}</style>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth.loggedIn()? Profile : authCheck;