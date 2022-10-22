import './SingleCard.css';

export default function SingleCard({ card, handleChoice, flipped }) {

  const handleClick = () => {
    handleChoice(card) 
  }

    return (
      <div className= "card">
        <div className={flipped ? "flipped" : ""}>
          <img 
            className="front" 
            src={card.src} 
            alt="card front"/>
          <img 
            className="back" 
            src="images/cards/coverCard.png"
            onClick={handleClick} 
            alt="card back" 
          />
        </div>
      </div>
    )
}

export default function SingleCard({ card, handleChoice }) {
  const handleClick = () => {
    handleChoice(card)
    
  }
  return (
    <>
      {card.src ?
        <div className="card" >
            {/* <img
              className="front"
              src="images/cards/coverCard.png"
              alt="card front" /> */}
            <img
              className="back"
              src={card.src}
              onClick={handleClick}
              alt="card back"
            />
        </div> :
        <div className='card'></div>
      }
    </>
  )
}
