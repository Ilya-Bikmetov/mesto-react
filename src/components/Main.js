function Main() {
  return (
    <>
      <section className="profile">
        <div className="profile__user-set">
          <div className="profile__avatar"></div>
          <div className="profile__info">
            <div className="profile__name">
              <h1 className="profile__title"></h1>
              <button type="button" aria-label="Редактировать" className="profile__edit-button"></button>
            </div>
            <p className="profile__subtitle"></p>
          </div>
        </div>
        <button type="button" aria-label="Добавить" className="profile__add-button"></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
        </ul>
      </section>
    </>
  );
}

export default Main;
