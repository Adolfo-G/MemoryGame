import React, { useEffect, useState } from "react";
import "./style.css";
import "../../components/SingleCard.css";
import SingleCard from "../../components/SingleCard.js";
import Auth from "../../utils/auth"

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
  const [runCheck,setRunCheck] = useState(true)
  
  // shuffle cards
  const shuffleCards = () => {
    setRunCheck(true)
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
              return { ...card, matched: true }
            } else {
              return card;
            }
          })
        })
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo])

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(true);
  }

  // start a new game
  // useEffect(() => {
  //   shuffleCards();
  // }, [])
  ////////////////////////////////////////////////
  const email = Auth.loggedIn() ? Auth.getProfile().data.email : ""
  const [profile, setProfile] = useState()
  let done;
  let score = Math.floor((cards.length * (cards.length / (turns * 2))) * 100)

  if(runCheck){
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
    if (isDone === true) {
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
    }
    done =  isDone;
  }

  if (done === true && Auth.loggedIn() && profile) {
    updateProfile()
    done=false
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
    done=false
  }
  ///////////////////////////////////////////////////////////////

  return (
    <div className="Home">
      <h1>Violet Memory</h1>
      <button onClick={shuffleCards}>New Game</button>
      {!runCheck ?
        <div>
          <div>Nice work</div>
          <div>Your Score Is {score}</div>
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