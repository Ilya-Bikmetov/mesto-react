import PopupWithForm from "./PopupWithForm.js";

export default function EditAvatarPopup({ isOpen, onUpdateAvatar, onClose, avatarInputLink }) {
  const handleClose = () => {
    onClose();
    avatarInputLink.current.value = '';
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar(avatarInputLink.current.value);
    avatarInputLink.current.value = '';
  }

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={handleClose}
      buttonText={'Сохранить'}
    >
      <div className="popup__field">
        <input
          ref={avatarInputLink}
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
  )

}

