import { useEffect, useState, useRef } from 'react';
import Footer from "./Footer.js";
import Header from "./Header.js";
import ImagePopup from "./ImagePopup.js";
import Main from "./Main.js";
import { api } from "../utils/Api.js"
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import DeleteCardPopup from './DeleteCardPopup.js';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpenState] = useState(false);
  const [isImageCardPopupOpen, setImageCardPopupOpenState] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({ name: '', about: '', avatar: '' });
  const [cards, setCards] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [placeLink, setPlaceLink] = useState('');
  const avatarInputLink = useRef('');

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

  const handleTrashClick = (card) => {
    setSelectedCard(card);
    setDeleteCardPopupOpenState(true);
  }

  const submitCardDelete = (card) => {
    handleCardDelete(card);
    closeAllPopups();
  }

  const handleInputName = (userName) => setName(userName);
  const handleInputDescription = (userDescription) => setDescription(userDescription);
  const handleInputPlaceName = (place) => setPlaceName(place);
  const handleInputPlaceLink = (url) => setPlaceLink(url);

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
        setCurrentUser(user);
      })
      .catch((err) => console.log(err));
    closeAllPopups();
  }

  const handleUpdateAvatar = (avatarLink) => {
    api.setAvatar('users/me/avatar', avatarLink)
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => console.log(err));
    closeAllPopups();
  }

  const handleAddPlaceSubmit = ({ name, link }) => {
    api.addCard({ name, link, url: 'cards' })
      .then((card) => setCards([card, ...cards]))
      .catch((err) => console.log(err));
    closeAllPopups();
  }

  const closeAllPopups = () => {
    if (isEditProfilePopupOpen) {
      setEditProfilePopupState(false);
      setName(currentUser.name);
      setDescription(currentUser.about);
    }

    if (isAddPlacePopupOpen) {
      setAddPlacePopupState(false);
      setPlaceName('');
      setPlaceLink('');
    }

    if (isEditAvatarPopupOpen) {
      setEditAvatarPopupState(false);
      avatarInputLink.current.value = '';
    }

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

  useEffect(() => {
    api.getInitialCards('cards')
      .then((items) => {
        setCards(items);
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
            onCardLike={handleCardLike}
            onCardDelete={handleTrashClick}
            cards={cards}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
            onClose={closeAllPopups}
            handleInputDescription={handleInputDescription}
            handleInputName={handleInputName}
            name={name}
            description={description}
          />
          <Footer />
        </CurrentUserContext.Provider>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
          avatarInputLink={avatarInputLink}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImageCardPopupOpen}
          onClose={closeAllPopups}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleAddPlaceSubmit}
          name={placeName}
          link={placeLink}
          handlePlace={handleInputPlaceName}
          handleLink={handleInputPlaceLink}
        />
        <DeleteCardPopup
          card={selectedCard}
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onSubmit={submitCardDelete}
        />
      </div>
    </div>

  );

}

export default App;
