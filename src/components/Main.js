import { useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { api } from '../utils/Api.js';
import Card from './Card.js';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onDeleteCard, onCardClick }) {
  const [cards, setCards] = useState([]);
  const currentUser = useContext(CurrentUserContext);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(`cards/${card._id}/likes`, isLiked)
      .then((newCard) => setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c)))
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(`cards/${card._id}`)
      .then(() => setCards((cards) => cards.filter((c) => c._id !== card._id)))
      .catch((err) => console.log(err));
  }



  useEffect(() => {
    api.getInitialCards('cards')
      .then((items) => {
        setCards(items);
      })
      .catch((err) => console.log(err));

  }, []);

  return (
    <>
      <section className="profile">
        <div className="profile__user-set">
          <div
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
            onClick={onEditAvatar}
            className="profile__avatar">
          </div>
          <div className="profile__info">
            <div className="profile__name">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button onClick={onEditProfile} type="button" aria-label="Редактировать" className="profile__edit-button"></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button onClick={onAddPlace} type="button" aria-label="Добавить" className="profile__add-button"></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {
            cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                removeCard={onDeleteCard}
              />
            ))
          }
        </ul>
      </section>
    </>
  );
}

export default Main;
