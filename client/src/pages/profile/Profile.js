import React from "react";
import './style.css'

function Profile(){
    let exp = 500
    let expMax=1000
    let expRatio=(exp/expMax)*100;
    let css = `
        #progressbar>div {
            width: ${expRatio}%;
        }
    `
    //fetch call to get user data

    //edititng of user name

    return(
        <div className="profileBG">
            <div className="profileCard">
                <div className="profileName">
                    <h1>Admin</h1>
                    <button>Edit</button>
                </div>
                <h2 className="profileRank profileInfo">Rank: Bronze</h2>
                <h2 className="profileMaxHighscore profileInfo">Top HighScore: 220</h2>
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

export default Profile;