import './Login.css';
import { useEffect } from "react";
import Input from '../Input/Input';
import { useFormWithValidation } from "../../hooks/useFormHook";
import { Link } from "react-router-dom";
import cn from 'classnames';

function Login(props) {

  const { onLogin, onUnmount, disableForm, submitMessage, clearSubmitMessage } = props;
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values);
  };

  const handleFieldChange = (e) => {
    handleChange(e);
    clearSubmitMessage();
  };

  useEffect(() => {
    return onUnmount;
  }, []);

  return (
    <section className="login">
      <Link to="/" className="login__logo" ></Link>
      <h2 className="login__title">Рады видеть!</h2>
      <form className="login__form" name="login-form" action="#" onSubmit={handleSubmit}>
        <Input
          name="email"
          type="email"
          label="E-mail"
          value={values.email || ''}
          validationMessage={errors.email}
          onChange={handleFieldChange}
          disabled={disableForm}
        />
        <Input
          name="password"
          type="password"
          label="Пароль"
          value={values.password || ''}
          validationMessage={errors.password}
          onChange={handleFieldChange}
          disabled={disableForm}
        />
        <p className="login__submit-message">{submitMessage}</p>
        <button className={cn('login__button', { 'login__button_non-active': !isValid })} type="submit" disabled={!isValid || disableForm} >Войти</button>
      </form>
      <div className="login__footer">
        <p className="login__footer-text">Ещё не зарегистрированы?</p>
        <Link to="/signup" className="login__footer-link" >Регистрация</Link>
      </div>
    </section>
  );
}

export default Login;