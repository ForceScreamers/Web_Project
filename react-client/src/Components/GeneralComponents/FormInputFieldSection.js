import FormInputField from "./FormInputField"
import '../../CSS/pages-css/Login.css'


export default function FormInputFieldSection({ Valid, Name, OnChange, UserErrorMessageText, Label, Type }) {
  return (
    <div>
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
