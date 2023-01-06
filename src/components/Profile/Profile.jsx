import './Profile.css';
import { useContext, useEffect } from "react";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from "../../hooks/useFormHook";
import cn from 'classnames';

function Profile(props) {

  const { onExit, onSubmit, onUnmount, disableForm, submitResult, clearSubmitMessage } = props;
  const currentUser = useContext(CurrentUserContext);
  const { name, email } = currentUser;
  const { values, handleChange, setValues, errors, isValid } = useFormWithValidation();

  const submitAvailable = isValid && (values.name !== name || values.email !== email);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  const handleFieldChange = (e) => {
    handleChange(e);
    clearSubmitMessage();
  };

  useEffect(() => {
    setValues({
      name: currentUser.name || '',
      email: currentUser.email || ''
    });
  }, [currentUser]);

  useEffect(() => {
    return onUnmount;
  }, []);

  return (
    <section className="profile">
      <h2 className="profile__title">{`Привет, ${name}!`}</h2>
      <form className="profile__form" name="profile-form" action="#" onSubmit={handleSubmit}>
        <label htmlFor="name" className="profile__label">
          <input
            className="profile__input"
            type="text"
            id="name"
            name="name"
            required
            value={values.name || ''}
            onChange={handleFieldChange}
            disabled={disableForm}
          />
          <span className="profile__input-title">Имя</span>
          <span className="profile__input-error">{errors.name}</span>
        </label>
        <label htmlFor="email" className="profile__label">
          <input
            className="profile__input"
            type="email"
            id="email"
            name="email"
            required
            value={values.email || ''}
            onChange={handleFieldChange}
            disabled={disableForm}
          />
          <span className="profile__input-title">E-mail</span>
          <span className="profile__input-error">{errors.email}</span>
        </label>
        <p className={cn('profile__submit-message', { 'profile__submit-message_error': submitResult.isError })}>{submitResult.message}</p>
        <button className={cn('profile__button', { 'profile__button_non-active': !submitAvailable })} type="submit" disabled={!submitAvailable || disableForm}>Редактировать</button>
      </form>
      <button className="profile__button profile__button_exit" type="button" onClick={onExit}>Выйти из аккаунта</button>
    </section>
  );
}

export default Profile;