import '../../CSS/pages-css/ParentLogin.css'

const MAX_INPUT_LENGTH = 40;

export default function FormInputField({ Name, Valid, OnChange, Type, Label }) {

  return (
    <input
      className={`d-flex justify-content-end align-items-start ${Valid ? "" : "border-danger"}`}
      onChange={OnChange}
      name={Name}
      type={Type}
      maxLength={MAX_INPUT_LENGTH}
      placeholder={Label}
    />
  )
}

{/* Split into 2 components */ }
{/* <label>{Valid ? null : UserErrorMessageText}</label> */ }