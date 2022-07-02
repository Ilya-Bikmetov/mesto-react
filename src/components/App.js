import Footer from "./Footer.js";
import Header from "./Header.js";
import Main from "./Main.js";

function App() {
  return (
    <div className="root">
      <div className="page">
        <Header />
        <Main />
        <Footer />
        <div className="popup popup_place_edit">
          <form className="popup__content" name="edit-profile" noValidate>
            <button className="popup__close" type="button" aria-label="Закрыть"></button>
            <h2 className="popup__title">Редактировать профиль</h2>
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
            <button className="popup__btn" type="submit" aria-label="Сохранить">Сохранить</button>
          </form>
        </div>

        <div className="popup popup_place_add">
          <form className="popup__content popup__content_form_add" name="add-place" noValidate>
            <button className="popup__close popup__close_form_add" type="button" aria-label="Закрыть"></button>
            <h2 className="popup__title">Новое место</h2>
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
            <button className="popup__btn" type="submit" aria-label="Создать">Создать</button>
          </form>
        </div>

        <div className="popup popup_place_img">
          <div className="popup__content-img">
            <button className="popup__close popup__close_form_img" type="button" aria-label="Закрыть"></button>
            <img className="popup__img" src="#" alt="#" />
            <p className="popup__img-sign"></p>
          </div>
        </div>

        <div className="popup popup_avatar">
          <form className="popup__content popup__content_form_avatar">
            <h2 className="popup__title">Обновить аватар</h2>
            <button className="popup__close popup__close_form_img" type="button" aria-label="Закрыть"></button>
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
            <button className="popup__btn" id="confirm-change-avatar-btn" type="submit" aria-label="Сохранить аватар">Сохранить</button>
          </form>
        </div>

        <div className="popup popup_delete_card">
          <form className="popup__content">
            <h2 className="popup__title">Вы уверены?</h2>
            <button className="popup__close popup__close_form_img" type="button" aria-label="Закрыть"></button>
            <button className="popup__btn" id="confirm-delete-btn" type="submit" aria-label="Удалить картинку">Да</button>
          </form>
        </div>

      </div>
      <template id="template-сard">
        <li className="element">
          <button type="button" aria-label="Удалить" className="element__trash"></button>
          <img className="element__photo" />
          <div className="element__sign">
            <h2 className="element__title"></h2>
            <button className="element__like" type="button" aria-label="Поставить лайк"></button>
          </div>
          <p className="element__likes-amount"></p>
        </li>
      </template>

    </div>
  );
}

export default App;
