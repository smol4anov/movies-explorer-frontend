import './Register.css';
import { useEffect } from "react";
import Input from '../Input/Input';
import { useFormWithValidation } from "../../hooks/useFormHook";
import { Link } from "react-router-dom";
import cn from 'classnames';

function Register(props) {

  const { onRegister, onUnmount, disableForm, submitMessage, clearSubmitMessage } = props;
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values);
  };

  const handleEmailChange = (e) => {
    handleChange(e);
    clearSubmitMessage();
  };

  useEffect(() => {
    return onUnmount;
  }, []);

  return (
    <section className="register">
      <Link to="/" className="register__logo" ></Link>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form" name="register-form" action="#" onSubmit={handleSubmit}>
        <Input
          name="name"
          type="text"
          label="Имя"
          minlength={2}
          value={values.name || ''}
          validationMessage={errors.name}
          onChange={handleChange}
          disabled={disableForm}
        />
        <Input
          name="email"
          type="email"
          label="E-mail"
          value={values.email || ''}
          validationMessage={errors.email}
          onChange={handleEmailChange}
          disabled={disableForm}
        />
        <Input
          name="password"
          type="password"
          label="Пароль"
          minlength={6}
          value={values.password || ''}
          validationMessage={errors.password}
          onChange={handleChange}
          disabled={disableForm}
        />
        <p className="register__submit-message">{submitMessage}</p>
        <button className={cn('register__button', { 'register__button_non-active': !isValid })} type="submit" disabled={!isValid || disableForm} >Зарегистрироваться</button>
      </form>
      <div className="register__footer">
        <p className="register__footer-text">Уже зарегистрированы?</p>
        <Link to="/signin" className="register__footer-link" >Войти</Link>
      </div>
    </section>
  );
}

export default Register;