import './Input.css';

function Input(props) {

  const { type, name, label, minlength, value, validationMessage, disabled, onChange } = props;

  return (
    <label htmlFor={name} className="label">
      <span className="input-title">{label}</span>
      <input
        className="input"
        type={type}
        id={name}
        name={name}
        minLength={minlength}
        required
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      <span className="error-message">{validationMessage}</span>
    </label>
  );
}

export default Input;