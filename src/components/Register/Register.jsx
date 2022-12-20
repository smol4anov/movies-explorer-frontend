import './Register.css';
import Input from '../Input/Input';
import { useForm } from "../../hooks/useForm";

import { Link } from "react-router-dom";


const initFields = {
  password: '',
  email: '',
  name: '',
};

function Register(props) {

  const { values, validationMessages, handleChange } = useForm(initFields, initFields);

  const allInputIsValid = !validationMessages.password && !validationMessages.email && !validationMessages.name;

  return (
    <section className="register">
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form" name="register-form" action="#" noValidate>
        <Input
          name="name"
          type="text"
          label="Имя"
          minlength={2}
          value={values.name}
          validationMessage={validationMessages.name}
          onChange={handleChange}
        />
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
        <button className="register__button" type="submit" disabled={!allInputIsValid}>Зарегистрироваться</button>
      </form>
      <div className="register__footer">
        <p className="register__footer-text">Уже зарегистрированы?</p>
        <Link to="/signin" className="register__footer-link" >Войти</Link>
      </div>
    </section>
  );
}

export default Register;