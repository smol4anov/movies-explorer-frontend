import React, { useCallback } from "react";
import { nameValidationRegExp, nameValidationMessage, emailValidationMessage } from '../utils/constants.js';
import isEmail from 'validator/lib/isEmail';

//хук управления формой
export function useForm() {
  const [values, setValues] = React.useState({});

  const handleChange = (event) => {

    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}

//хук управления формой и валидации формы
export function useFormWithValidation() {

  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());

    if (name === 'name' && !target.validationMessage && !nameValidationRegExp.test(value)) {
      setErrors({ ...errors, [name]: nameValidationMessage });
      setIsValid(false);
    }

    if (name === 'email' && !target.validationMessage && !isEmail(value)) {
      setErrors({ ...errors, [name]: emailValidationMessage });
      setIsValid(false);
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, setValues, errors, isValid, resetForm };
}