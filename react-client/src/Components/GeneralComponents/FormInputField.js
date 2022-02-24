const MAX_INPUT_LENGTH = 40;

export default function FormInputField({ Name, Valid, OnChange, Type }) {

  return (
    <input
      className={Valid ? "" : "border-danger"}
      onChange={OnChange}
      name={Name}
      type={Type}
      maxLength={MAX_INPUT_LENGTH}
    />
  )
}

{/* Split into 2 components */ }
{/* <label>{Valid ? null : UserErrorMessageText}</label> */ }