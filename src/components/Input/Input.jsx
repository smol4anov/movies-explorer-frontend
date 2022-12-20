import './Input.css';

function Input(props) {

  const { type, name, label, minlength, value, validationMessage, onChange } = props;

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
      />
      <span className="error-message">{validationMessage}</span>
    </label>
  );
}

export default Input;