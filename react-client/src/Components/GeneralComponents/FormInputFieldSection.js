import FormInputField from "./FormInputField"
import '../../CSS/pages-css/ParentLogin.css'


export default function FormInputFieldSection({ Valid, Name, OnChange, UserErrorMessageText, Label, Type }) {
  return (
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-between">
        {/* <label>{Label}</label> */}
        <label>{Valid ? "" : UserErrorMessageText}</label>
      </div>

      <FormInputField
        Valid={Valid}
        Label={Label}
        Name={Name}
        OnChange={OnChange}
        Type={Type}
      />
      <br />
    </div>
  )
}
