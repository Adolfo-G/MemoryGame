import React, { useEffect, useState } from "react";
import "./style.css";
import "../../components/SingleCard.css";
import SingleCard from "../../components/SingleCard.js";
import Auth from "../../utils/auth"

const purplePairs = [
  { "src": "/images/cards/affair.png", matched: false },
  { "src": "/images/cards/amethyst.png", matched: false },
  { "src": "/images/cards/azalea.png", matched: false },
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

const audio = [
  new Audio("/audio/match.mp3"),
  new Audio("/audio/notAMatch.mp3")
];

function Home() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false)
  const [runCheck, setRunCheck] = useState(true)

  // shuffle cards
  const shuffleCards = () => {
    setRunCheck(true)
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

  // compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              audio[0].play(); 
              return {...card, matched: true};
            } else {
              return card;
            }
          })
        })
        resetTurn();
      } else {
        audio[1].play();
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

      // end game and update database
      const email = Auth.loggedIn() ? Auth.getProfile().data.email : ""
      const [profile, setProfile] = useState()
      let done;
      let score = Math.floor((cards.length * (cards.length / (turns * 2))) * 100)
      if (runCheck) {
        doneCheck(email)
      }

      function doneCheck(email) {
        let isDone = false
        let total = 0
        for (let i = 0; i < cards.length; i++) {
          if (cards[i].matched === true) {
            total++
          }
          if (total === cards.length) {
            isDone = true
          }
        }
        if (isDone === true && email !== "") {
          try {
            async function fetchProfile() {
              try {
                let data = await fetch(`http://localhost:3001/api/users/profile/${email}`);
                return data
              } catch {
                console.log("data failed to load")
              }
            }
            fetchProfile()
              .then((res) => res.json())
              .then((data) => {
                setProfile(data)
              })
              .catch((err) => console.log(err));
          } catch {
            console.log("error retreving profile")
          }
        } else if (isDone === true && email === "") {
          setRunCheck(false)
        }
        done = isDone;
      }

      if (done === true && Auth.loggedIn() && profile) {
        updateProfile()
        done = false
      }

      function updateProfile() {
        console.log("update score")
        try {
          async function editScore(url = '', data = {}) {
            const response = await fetch(url, {
              method: 'PUT',
              mode: 'cors',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });
            if (!response.ok) {
              console.log("response failed")
            }
            return response.json();
          }

          editScore('http://localhost:3001/api/users/updateScore', {
            email: email,
            score: score > profile.score ? score : profile.score,
            experience: profile.experience < 1000 ? profile.experience + 50 : 0,
            rank: profile.experience >= 1000 ? profile.rank + 1 : profile.rank
          })
            .catch((err) => alert("There was an issue editing your account. Please try again"))
        } catch {
          console.log("error editing username")
        }
        setRunCheck(false)
        done = false
      }

      return (
        <div className="Home">
          <h1>History of Violets</h1>
          <button onClick={shuffleCards}>Pair Some Purples!</button>

          {!runCheck ?
            <div>
              <h1>Congratulations!</h1>
              <h2>Your Score Is {score}</h2>
            </div>
            :
            <div>
              <div className="card-grid">
                {cards.map(card => (
                  <SingleCard
                    key={card.id}
                    card={card}
                    handleChoice={handleChoice}
                    flipped={card === choiceOne || card === choiceTwo || card.matched}
                    disabled={disabled}
                  />
                ))}
              </div>
              <p>Turns: {turns}</p>
            </div>
          }
        </div>
      );
    }

    export default Home;