function Main(props) {
  return (
    <>
      <section className="profile">
        <div className="profile__user-set">
          <div onClick={props.onEditAvatar} className="profile__avatar"></div>
          <div className="profile__info">
            <div className="profile__name">
              <h1 className="profile__title"></h1>
              <button onClick={props.onEditProfile} type="button" aria-label="Редактировать" className="profile__edit-button"></button>
            </div>
            <p className="profile__subtitle"></p>
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
