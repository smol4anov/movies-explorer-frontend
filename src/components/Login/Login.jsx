import './Login.css';
import Input from '../Input/Input';
import { useForm } from "../../hooks/useForm";
import { Link } from "react-router-dom";

const initFields = {
  password: '',
  email: '',
};

function Login(props) {

  const { values, validationMessages, handleChange } = useForm(initFields, initFields);

  const allInputIsValid = !validationMessages.password && !validationMessages.email;

  return (
    <section className="login">
      <Link to="/" className="login__logo" ></Link>
      <h2 className="login__title">Рады видеть!</h2>
      <form className="login__form" name="login-form" action="#">
        <Input
          name="email"
          type="email"
          label="E-mail"
          value={values.email}
          validationMessage={validationMessages.email}
          onChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          label="Пароль"
          minlength={6}
          value={values.password}
          validationMessage={validationMessages.password}
          onChange={handleChange}
        />
        <button className="login__button" type="submit" disabled={!allInputIsValid}>Войти</button>
      </form>
      <div className="login__footer">
        <p className="login__footer-text">Ещё не зарегистрированы?</p>
        <Link to="/signup" className="login__footer-link" >Регистрация</Link>
      </div>
    </section>
  );
}

export default Login;