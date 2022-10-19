import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./style.css";
import SingleCard from "../../components/SingleCard";

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
    { "src": "/images/cards/studentAl.png" },
    { "src": "/images/cards/talkAl.png" },
    { "src": "/images/cards/tinAl.png" },
    { "src": "/images/cards/weirdAl.png" }
  ]

function Home() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  // shuffle cards
  const shuffleCards = () => {
    const shuffleCards = [...weirdCards, ...weirdCards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

      setCards(shuffleCards);
      setTurns(0);
  }

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

// compare two selected cards
useEffect(() => {
  if (choiceOne && choiceTwo) {

    if (choiceOne.src === choiceTwo.src) {
      console.log("It's a Match! You get a Twinkie Weiner Sandwich!");
      resetTurn();
    } else {
      console.log("It's not a match.")
      resetTurn();
    }
  }
}, [choiceOne, choiceTwo])

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1)
  }

    return (
       <div className="Home">
          <h1>Weird Memory</h1>
          <button onClick={shuffleCards}>New Game</button>

          <div className="card-grid">
            {cards.map(card => (
              <SingleCard 
                key={card.id} 
                card={card}
                handleChoice={handleChoice}
              />
            ))}
          </div>
       </div>
    );
}

export default Home;