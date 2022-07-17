import { useEffect, useState, } from 'react';
import Footer from "./Footer.js";
import Header from "./Header.js";
import ImagePopup from "./ImagePopup.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import { api } from "../utils/Api.js"
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpenState] = useState(false);
  const [isImageCardPopupOpen, setImageCardPopupOpenState] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  const handleEditProfileClick = () => setEditProfilePopupState(true);
  const handleAddPlaceClick = () => setAddPlacePopupState(true);
  const handleEditAvatarClick = () => setEditAvatarPopupState(true);
  const handleDeleteCardClick = () => setDeleteCardPopupOpenState(true);
  const handleImageCardClick = () => setImageCardPopupOpenState(true);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    handleImageCardClick();
  }

  const handleUpdateUser = ({ name, about }) => {
    api.addUser({ name, about }, 'users/me')
      .then((user) => {
        setCurrentUser(user)
      })
      .catch((err) => console.log(err));
    closeAllPopups();
  }

  const closeAllPopups = () => {
    isEditProfilePopupOpen && setEditProfilePopupState(false);
    isAddPlacePopupOpen && setAddPlacePopupState(false);
    isEditAvatarPopupOpen && setEditAvatarPopupState(false);
    isDeleteCardPopupOpen && setDeleteCardPopupOpenState(false);
    isImageCardPopupOpen && setImageCardPopupOpenState(false);
  }

  useEffect(() => {
    if (isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isDeleteCardPopupOpen || isImageCardPopupOpen) {
      function handleEscClose(evt) {
        if (evt.key === 'Escape') {
          closeAllPopups();
        }
      }
      function handleMouseClickClose(evt) {
        if (evt.target.classList.contains('popup'))
          closeAllPopups();
      }

      document.addEventListener('mousedown', handleMouseClickClose);
      document.addEventListener('keydown', handleEscClose);

      return () => {
        document.removeEventListener('keydown', handleEscClose)
        document.removeEventListener('mousedown', handleMouseClickClose);
      };
    }
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, isDeleteCardPopupOpen, isImageCardPopupOpen]);

  useEffect(() => {
    api.getUser('users/me')
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err));

  }, []);

  return (
    <div className="root">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onDeleteCard={handleDeleteCardClick}
            onCardClick={handleCardClick}
          />
          <Footer />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
        <ImagePopup
          card={selectedCard}
          isOpen={isImageCardPopupOpen}
          onClose={closeAllPopups}
        />
        <PopupWithForm
          name='place_add'
          title='Новое место'
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          buttonText={'Создать'}
        >
          <div className="popup__field">
            <input
              id="place-name-input"
              type="text"
              name="placename"
              className="popup__input popup__input_add-form_placename"
              placeholder="Название"
              minLength="2"
              maxLength="30"
              required
            />
            <span id="place-name-input-error" className="popup__input-error">Вы пропустили это поле.</span>
          </div>
          <div className="popup__field">
            <input
              id="url-input"
              type="url"
              name="imgLink"
              className="popup__input popup__input_add-form_link"
              placeholder="Ссылка на картинку"
              required
            />
            <span id="url-input-error" className="popup__input-error">Введите адрес сайта.</span>
          </div>
        </PopupWithForm>
        <PopupWithForm
          name='avatar'
          title='Обновить аватар'
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          buttonText={'Сохранить'}
        >
          <div className="popup__field">
            <input
              id="avatar-url-input"
              type="url"
              name="avatarLink"
              className="popup__input popup__input_avatar-form_link"
              placeholder="Ссылка на аватар"
              required
            />
            <span id="avatar-url-input-error" className="popup__input-error">Введите адрес сайта.</span>
          </div>
        </PopupWithForm>
        <PopupWithForm
          name='delete_card'
          title='Вы уверены?'
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          buttonText={'Да'}
        >
        </PopupWithForm>

      </div>

    </div>

  );

}

export default App;
