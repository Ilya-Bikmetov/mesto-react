function ImagePopup() {
  return (
      <div className="popup popup_place_img">
        <div className="popup__content-img">
          <button className="popup__close popup__close_form_img" type="button" aria-label="Закрыть"></button>
          <img className="popup__img" src="#" alt="#" />
          <p className="popup__img-sign"></p>
        </div>
      </div>
  );
}

export default ImagePopup;
