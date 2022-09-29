import React, { useState } from 'react'
import Scores from '../../components/Scores';
import './style.css'

function Scoreboard() {
    let testScores = [
        {
            "name": "Johnny",
            "score": 150 
        },
        { 
            "name":"Daniel",
            "score": 120
        },
        { 
            "name":"Sam",
            "score": 92 
        },
        { 
            "name":"Miguel",
            "score": 90 
        },
        { 
            "name":"Eli",
            "score": 88
        },
    ]

    let [scores, setScores] = useState('');

    // fetch call to get data

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
                            {testScores.map((scores) => (
                                <Scores scores={scores}/>
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

export default Scoreboard;