import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./style.css";

const weirdCards = [
    { "src": "/images/cards/accordAl.png" },
    { "src": "/images/cards/amishAl.png" },
    { "src": "/images/cards/blurAl.png" },
    { "src": "/images/cards/bubbleAl.png" },
    { "src": "/images/cards/docAl.png" },
    { "src": "/images/cards/grammyAl.png" },
    { "src": "/images/cards/hollywoodAl.png" },
    { "src": "/images/cards/magazineAl.png" },
    { "src": "/images/cards/ramboAl.png" },
    { "src": "/images/cards/signAl.png" },
    { "src": "/images/cards/tudentAl.png" },
    { "src": "/images/cards/talkAl.png" },
    { "src": "/images/cards/inAl.png" },
    { "src": "/images/cards/weirdAl.png" }
  ]

function Home() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)

  // shuffle cards
  const shuffleCards = () => {
    const shuffleCards = [...weirdCards, ...weirdCards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

      setCards(shuffleCards);
      setTurns(0);
  }

  console.log(cards, turns);

    return (
       <div className="Home">
          <h1>Weird Memory</h1>
          <button onClick={shuffleCards}>New Game</button>

          <div className="card-grid">
            {cards.map(card => (
              <div className= "card" key={card.id}>
                <div>
                  <img className="front" src="/images/cards/coverCard.png" alt="card front"/>
                  <img className="back" src={card.src} alt="card back" />
                </div>
              </div>
            ))}
          </div>
       </div>
    );
}

export default Home;