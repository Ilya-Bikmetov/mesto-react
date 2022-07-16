import { useEffect, useState,  } from 'react';
import Footer from "./Footer.js";
import Header from "./Header.js";
import ImagePopup from "./ImagePopup.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import {api} from "../utils/Api.js"
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpenState] = useState(false);
  const [isImageCardPopupOpen, setImageCardPopupOpenState] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  function handleEditProfileClick() {
    setEditProfilePopupState(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupState(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupState(true);
  }

  function handleDeleteCardClick() {
    setDeleteCardPopupOpenState(true);
  }

  function handleImageCardClick() {
    setImageCardPopupOpenState(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    handleImageCardClick();
  }

  function closeAllPopups() {
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
        </CurrentUserContext.Provider>
        <ImagePopup
          card={selectedCard}
          isOpen={isImageCardPopupOpen}
          onClose={closeAllPopups}
        />
        <PopupWithForm
          name='place_edit'
          title='Редактировать профиль'
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          buttonText={'Сохранить'}
        >
          <div className="popup__field">
            <input
              id="name-input"
              type="text"
              name="username"
              className="popup__input popup__input_edit-form_name"
              placeholder="Имя"
              minLength="2"
              maxLength="40"
              required
            />
            <span id="name-input-error" className="popup__input-error">Вы пропустили это поле.</span>
          </div>
          <div className="popup__field">
            <input
              id="job-input"
              type="text"
              name="jobInfo"
              className="popup__input popup__input_edit-form_job"
              placeholder="Профессиональная деятельность"
              minLength="2"
              maxLength="200"
              required
            />
            <span id="job-input-error" className="popup__input-error">Вы пропустили это поле.</span>
          </div>
        </PopupWithForm>
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