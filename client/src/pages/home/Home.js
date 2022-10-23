import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./style.css";
import "../../components/SingleCard.css";
import SingleCard from "../../components/SingleCard.js";

const weirdCards = [

    { "src": "/images/cards/accordAl.png", matched: false },
    { "src": "/images/cards/amishAl.png", matched: false },
    { "src": "/images/cards/blurAl.png", matched: false },
    { "src": "/images/cards/bubbleAl.png", matched: false },
    { "src": "/images/cards/docAl.png", matched: false },
    { "src": "/images/cards/grammyAl.png", matched: false },
    { "src": "/images/cards/hollywoodAl.png", matched: false },
    { "src": "/images/cards/magazineAl.png", matched: false },
    { "src": "/images/cards/ramboAl.png", matched: false },
    { "src": "/images/cards/signAl.png", matched: false },
    { "src": "/images/cards/studentAl.png", matched: false },
    { "src": "/images/cards/talkAl.png", matched: false },
    { "src": "/images/cards/tinAl.png", matched: false },
    { "src": "/images/cards/weirdAl.png", matched: false }
  ]

function Home() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false)

  // shuffle cards
  const shuffleCards = () => {
    const shuffleCards = [...weirdCards, ...weirdCards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

      setChoiceOne(null);
      setChoiceTwo(null);
      setCards(shuffleCards);
      setTurns(0);

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
    setDisabled(true);

    if (choiceOne.src === choiceTwo.src) {
      setCards(prevCards => {
        return prevCards.map(card => {
          if (card.src === choiceOne.src) {
            return {...card, matched: true}
          } else {
            return card;
          }
        })
      })
      resetTurn();
    } else {
      setTimeout(() => resetTurn(), 1000);
    }
  }}, [choiceOne, choiceTwo])

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(true);
  }

  // start a new game
  useEffect(() => {
    shuffleCards();
  }, [])

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
                flipped={card === choiceOne || card === choiceTwo || card.matched } 
                disabled={disabled}
              />
            ))}
          </div>
          <p>Turns: {turns}</p>
       </div>
    );
}

export default Home;