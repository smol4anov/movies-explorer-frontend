import './Profile.css';

function Profile(props) {

  return (
    <section className="profile">
      <h2 className="profile__title">Привет, Виталий!</h2>
      <form className="profile__form" name="profile-form" action="#" noValidate>
        <label htmlFor="name" className="profile__label">
          <input
            className="profile__input"
            id="name"
            name="name"
            required
            value={'Виталий'}
          />
          <span className="profile__input-title">Имя</span>
        </label>
        <label htmlFor="email" className="profile__label">
          <input
            className="profile__input"
            id="email"
            name="email"
            required
            value={'pochta@yandex.ru'}
          />
          <span className="profile__input-title">E-mail</span>
        </label>
        <button className="profile__button" type="submit">Редактировать</button>
      </form>
      <button className="profile__button profile__button_exit" type="button">Выйти из аккаунта</button>
    </section>
  );
}

export default Profile;