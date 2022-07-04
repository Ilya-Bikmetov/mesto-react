function Card({ item, userId }) {

  return (
    <li className="element">
      <button type="button" aria-label="Удалить" className="element__trash" style={
        item.owner._id === userId
          ? { visibility: "visible" }
          : { visibility: "hidden" }
      }></button>
      <img src={item.link} className="element__photo" />
      <div className="element__sign">
        <h2 className="element__title">{item.name}</h2>
        <button className={
          item.likes.some(item => item._id === userId)
            ? `element__like element__like_active`
            : `element__like`
        }
          type="button"
          aria-label="Поставить лайк"></button>
      </div>
      <p className={
        item.likes.length > 0
          ? `element__likes-amount element__likes-amount_active`
          : `element__likes-amount`
      }>{item.likes.length}</p>
    </li>
  )
}

export default Card;
