function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={
      isOpen
        ? `popup popup_place_img popup_active`
        : `popup popup_place_img`
    }>
      <div className="popup__content-img">
        <button onClick={onClose} className="popup__close popup__close_form_img" type="button" aria-label="Закрыть"></button>
        <img className="popup__img" src={`${card.link}`} alt={card.name}/>
        <p className="popup__img-sign">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
