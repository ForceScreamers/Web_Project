import FormInputField from "./FormInputField"

export default function FormInputFieldSection({ Valid, Name, OnChange, UserErrorMessageText, Label, Type }) {
  return (
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-between">
        <label>{Label}</label>
        <label>{Valid ? "" : UserErrorMessageText}</label>
      </div>

      <FormInputField
        Valid={Valid}
        Name={Name}
        OnChange={OnChange}
        Type={Type}
      />
      <br />
    </div>
  )
}