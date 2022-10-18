import React, { useEffect, useState } from 'react'
import Scores from '../../components/Scores';
import './style.css'
import Auth from "../../utils/auth"

function authCheck() {
    if (Auth.loggedIn() === false) {
        return (
            <p className="logged-out-text">
                You need to be logged in to see this. Use the navigation links above to
                log in!
            </p>
        );
    }
}

function Scoreboard() {
    const [scores, setScores] = useState([])

    const getScores = () => {
        async function fetchScores() {
            try {
                let data = await fetch('http://localhost:3001/api/users/scores');
                return data
            } catch {
                console.log("data failed to load")
            }
        }
        fetchScores()
            .then((res) => res.json())
            .then((data) => setScores(data))
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getScores()
    }, [])

    return (
        <>
            <div className='scoreboard-body'>
                <div className='score-wrapper'>
                    <div >
                        <div className='sb-title-div'>
                            <h1 className='sb-title'>Scoreboard</h1>
                        </div>
                        <table className='scoreboard'>
                            <thead>
                                <tr>
                                    <td>Player</td>
                                    <td>Score</td>
                                </tr>
                            </thead>
                            <tbody>
                                <>
                                    {scores.map((score) => (
                                        <Scores score={score} />
                                    ))}
                                </>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Auth.loggedIn()? Scoreboard: authCheck;