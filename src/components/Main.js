function handleEditProfileClick() {
  document.querySelector('.popup_place_edit').classList.add('popup_active');

}

function handleAddPlaceClick() {
  document.querySelector('.popup_place_add').classList.add('popup_active');

}

function handleEditAvatarClick() {
  document.querySelector('.popup_avatar').classList.add('popup_active');

}

function Main() {
  return (
    <>
      <section className="profile">
        <div className="profile__user-set">
          <div onClick={handleEditAvatarClick} className="profile__avatar"></div>
          <div className="profile__info">
            <div className="profile__name">
              <h1 className="profile__title"></h1>
              <button onClick={handleEditProfileClick} type="button" aria-label="Редактировать" className="profile__edit-button"></button>
            </div>
            <p className="profile__subtitle"></p>
          </div>
        </div>
        <button onClick={handleAddPlaceClick} type="button" aria-label="Добавить" className="profile__add-button"></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
        </ul>
      </section>
    </>
  );
}

export default Main;
