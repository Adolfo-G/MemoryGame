import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./style.css";
import "../../components/SingleCard.css";
import SingleCard from "../../components/SingleCard.js";

const purplePairs = [

    { "src": "/images/cards/affair.png", matched: false },
    { "src": "/images/cards/amethyst.png", matched: false },
    { "src": "/images/cards/bossanova.png", matched: false },
    { "src": "/images/cards/byzantine.png", matched: false },
    { "src": "/images/cards/eminence.png", matched: false },
    { "src": "/images/cards/heart.png", matched: false },
    { "src": "/images/cards/potions.png", matched: false },
    { "src": "/images/cards/prince.png", matched: false },
    { "src": "/images/cards/seance.png", matched: false },
    { "src": "/images/cards/windsor.png", matched: false },
    { "src": "/images/cards/wisteria.png", matched: false },
  ];

// const matchAudio = [
//   audio for matches will go here
// ];

// const noMatchAudio = [
//  audio for non-matches will go here
// ];

function Home() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false)

  // shuffle cards
  const shuffleCards = () => {
    const shuffleCards = [...purplePairs, ...purplePairs]
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

  function randomNumber(arrLen) {
    return Math.floor(Math.random() * arrLen);
  }

// compare two selected cards
useEffect(() => {
  if (choiceOne && choiceTwo) {
    setDisabled(true);

    if (choiceOne.src === choiceTwo.src) {
      setCards(prevCards => {
        return prevCards.map(card => {
          if (card.src === choiceOne.src) {
            // let sound = new Audio(noMatchAudio[2]);
            // sound.play(); 
            return {...card, matched: true} ;
          } else {
            // let sound2 = new Audio(matchAudio[1]);
            // sound2.play();
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
          <h1>History of Violets</h1>
          <button onClick={shuffleCards}>Pair Some Purples!</button>

          <div className="card-grid">
            {purplePairs.map(card => (
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