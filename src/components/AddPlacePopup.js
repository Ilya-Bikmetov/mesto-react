import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({ isOpen, onClose, onSubmit, name, link, handlePlace, handleLink  }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, link });
  }
  const handlePlaceName = (e) => handlePlace(e.target.value);
  const handlePlaceLink = (e) => handleLink(e.target.value);

  return (
    <PopupWithForm
      name='place_add'
      title='Новое место'
      isOpen={isOpen}
      onClose={onClose}
      buttonText={'Создать'}
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <input
          value={name}
          id="place-name-input"
          type="text"
          name="placename"
          className="popup__input popup__input_add-form_placename"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          onChange={handlePlaceName}
        />
        <span id="place-name-input-error" className="popup__input-error">Вы пропустили это поле.</span>
      </div>
      <div className="popup__field">
        <input
          value={link}
          id="url-input"
          type="url"
          name="imgLink"
          className="popup__input popup__input_add-form_link"
          placeholder="Ссылка на картинку"
          required
          onChange={handlePlaceLink}
        />
        <span id="url-input-error" className="popup__input-error">Введите адрес сайта.</span>
      </div>
    </PopupWithForm>
  )

}

export default AddPlacePopup;
