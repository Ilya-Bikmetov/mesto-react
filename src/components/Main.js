import { useEffect, useState } from 'react';
import { api } from '../utils/Api.js';
import Card from './Card.js';

function Main(props) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [userId, setUserId] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUser('users/me'), api.getInitialCards('cards')])
      .then(([obj, items]) => {
        setUserName(obj.name);
        setUserDescription(obj.about);
        setUserAvatar(obj.avatar);
        setUserId(obj._id);
        setCards(items);
      })
      .catch((err) => console.log(err));

  }, []);

  return (
    <>
      <section className="profile">
        <div className="profile__user-set">
          <div
            style={{ backgroundImage: `url(${userAvatar})` }}
            onClick={props.onEditAvatar}
            className="profile__avatar">
          </div>
          <div className="profile__info">
            <div className="profile__name">
              <h1 className="profile__title">{userName}</h1>
              <button onClick={props.onEditProfile} type="button" aria-label="Редактировать" className="profile__edit-button"></button>
            </div>
            <p className="profile__subtitle">{userDescription}</p>
          </div>
        </div>
        <button onClick={props.onAddPlace} type="button" aria-label="Добавить" className="profile__add-button"></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((item) => <Card key={item._id} item={item} userId={userId}/>)}
        </ul>
      </section>
    </>
  );
}

export default Main;
