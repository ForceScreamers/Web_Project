import '../../CSS/pages-css/Login.css'

const MAX_INPUT_LENGTH = 40;

export default function FormInputField({ Name, Valid, OnChange, Type, Label, FormType, MaxLength, DefaultValue }) {

  return (
    <input
      className={`${FormType === "Login" ? "login-form-input-field" : "register-form-input-field"} ${Valid ? "" : "border-danger"}`}
      onChange={OnChange}
      name={Name}
      type={Type}
      maxLength={MaxLength}
      placeholder={Label}
      defaultValue={DefaultValue}
    />
  )
}