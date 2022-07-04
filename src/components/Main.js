import {useEffect, useState} from 'react';
import { api } from '../utils/Api.js';

function Main(props) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');

  useEffect(() => {
    api.getUser('users/me')
      .then((obj) => {
        setUserName(obj.name);
        setUserDescription(obj.about);
        setUserAvatar(obj.avatar);
      })
      .catch((err) => console.log(err));
  });

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
        </ul>
      </section>
    </>
  );
}

export default Main;
