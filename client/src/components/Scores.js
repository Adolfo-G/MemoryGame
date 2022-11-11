import React from "react";

function Scores(data) {
    let name = data.score.username;
    let score = data.score.score;
    let rank = data.score.rank
    let ranks={
        1:"Bronze",
        2:"Silver",
        3:"Gold",
        4:"Platinum",
        5:"Diamond"
    }
    return (
        <>
            <tr>
                <td className="scoreboardData">{ranks[rank]?ranks[rank]:"Diamond"}</td>
                <td className="scoreboardData">{name}</td>
                <td className="scoreboardData">{score}</td>
            </tr>
        </>
    )
}

export default Scores;