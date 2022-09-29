import React from "react";

function Scores(scores) {
    let name = scores.scores.name;
    let score = scores.scores.score;
    return (
        <>
            <tr>
                <td>{name}</td>
                <td>{score}</td>
            </tr>
        </>
    )
}

export default Scores;