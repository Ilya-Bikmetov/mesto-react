import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function Card({ card, removeCard, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  function handleClick() {
    onCardClick(card);
  }

  function handleLike() {
    onCardLike(card)
  }

  return (
    <li className="element">
      <button onClick={removeCard} type="button" aria-label="Удалить" className="element__trash" style={
        card.owner._id === currentUser._id
          ? { visibility: "visible" }
          : { visibility: "hidden" }
      }></button>
      <img onClick={handleClick} src={card.link} alt={card.name} className="element__photo" />
      <div className="element__sign">
        <h2 className="element__title">{card.name}</h2>
        <button className={
          card.likes.some(item => item._id === currentUser._id)
            ? `element__like element__like_active`
            : `element__like`
        }
          onClick={handleLike}
          type="button"
          aria-label="Поставить лайк"></button>
      </div>
      <p className={
        card.likes.length > 0
          ? `element__likes-amount element__likes-amount_active`
          : `element__likes-amount`
      }>{card.likes.length}</p>
    </li>
  )
}

export default Card;