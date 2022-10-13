import React from "react";

function Scores(data) {
    let name = data.score.username;
    let score = data.score.score;
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