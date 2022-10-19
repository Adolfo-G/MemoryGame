import './SingleCard.css';

export default function SingleCard({ card, handleChoice }) {

  const handleClick = () => {
    handleChoice(card)
  }

    return (
      <div className= "card">
        <div>
          <img 
            className="front" 
            src="images/cards/coverCard.png"
            alt="card front"/>
          <img 
            className="back" 
            src={card.src} 
            onClick={handleClick} 
            alt="card back" 
          />
        </div>
      </div>
    )
}