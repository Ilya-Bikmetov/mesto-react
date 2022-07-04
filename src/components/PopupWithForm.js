function PopupWithForm({ name, title, isOpen, onClose, children }) {

  return (
    <>
      <div className={isOpen
        ? `popup popup_${name} popup_active`
        : `popup popup_${name}`
      }>
        <form className="popup__content" name={`${name}`}>
          <button onClick={onClose} className="popup__close" type="button" aria-label="Закрыть"></button>
          <h2 className="popup__title">{title}</h2>
          {children}
        </form>
      </div>
    </>
  );
}

export default PopupWithForm;
