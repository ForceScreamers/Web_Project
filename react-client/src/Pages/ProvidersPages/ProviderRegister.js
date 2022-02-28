import '../../CSS/pages-css/Register.css'
import { Link } from "react-router-dom"
import { ValidateEmail, ValidatePassword, ValidateConfirmPassword, IsHebrewInputValid } from '../../Project-Modules/UserInputValidation'
import { useState } from 'react'
import { InputField } from '../../Project-Modules/UserInputValidation'
import FormInputFieldSection from '../../Components/GeneralComponents/FormInputFieldSection'

export default function ProviderRegister({ HandleProviderRegister }) {

  const [inputFields, setInputFields] = useState([
    new InputField("fullNameField", "שם מלא:", IsHebrewInputValid, "לא מתאים", "text"),
    new InputField("emailField", "כתובת מייל:", ValidateEmail, "שגיאה", "text"),
    new InputField("occupationField", "תעסוקה:", IsHebrewInputValid, "שגיאה", "text"),
    new InputField("passwordField", "סיסמה:", ValidatePassword, "ריק מתוכן", "password"),
    new InputField("confirmPasswordField", "אשר סיסמה:", ValidateConfirmPassword, "שגיאה", "password"),
  ]);


  function OnSubmit(e) {
    e.preventDefault();

    ValidateInputFields();

    console.log(IsFormValid())
    HandleProviderRegister(e, IsFormValid())
  }



  function ValidateInputFields() {
    let newInputFields = [...inputFields];

    //  Validate every field
    newInputFields.forEach(inputField => {
      inputField.Validate();
    })

    SetConfirmPasswordFieldIsValid(IsValidConfirmPasswordField());

    setInputFields(newInputFields);
  }



  function SetConfirmPasswordFieldIsValid(isValid) {
    let newInputFields = [...inputFields];

    newInputFields.forEach(inputField => {
      if (inputField.name === "confirmPasswordField") {
        inputField.isValid = isValid;
      }
    })

    setInputFields(newInputFields);
  }



  function IsValidConfirmPasswordField() {
    let password = GetPassword();
    let passwordToCompare = GetPasswordToCompare();
    return ValidateConfirmPassword(password, passwordToCompare);
  }

  function GetPasswordToCompare() {
    let passwordToCompare = "";

    inputFields.forEach(field => {
      if (field.name === "confirmPasswordField") {
        passwordToCompare = field.value;
      }
    })

    return passwordToCompare;
  }



  function GetPassword() {
    let password = "";

    inputFields.forEach(field => {
      if (field.name === "passwordField") {
        password = field.value;
      }
    })

    return password;
  }



  function IsFormValid() {
    let isFormValid = true;

    inputFields.forEach(inputField => {
      if (inputField.isValid === false) {
        isFormValid = false;
      }
    })

    return isFormValid;
  }



  function UpdateFieldValue(fieldName, newValue) {
    let newInputFields = [...inputFields];

    newInputFields.forEach(inputField => {
      if (inputField.name === fieldName) {
        inputField.value = newValue;
      }
    })

    setInputFields(newInputFields);
  }

  function RenderInputField(field, index) {
    return (
      <div key={index}>
        <FormInputFieldSection
          Label={field.labelText}
          Valid={field.isValid}
          Name={field.name}
          OnChange={(e) => { UpdateFieldValue(field.name, e.target.value) }}
          UserErrorMessageText={field.textErrorMessage}
          Type={field.type}
        />
      </div>
    )
  }

  return (
    <div>

      <div className="RegisterContainer">
        <h1>הרשמה בתור בעל מקצוע</h1>
        <Link to="/Provider/Login" >התחברות בתור בעל מקצוע</Link>

        <form onSubmit={OnSubmit}>
          <div className="InputContainer">

            {
              inputFields.map((field, index) => {
                return RenderInputField(field, index);
              })
            }

            <input type="submit" value="Register" />
          </div>
        </form>
        <Link to="/" >התחברות בתור הורה</Link>

      </div>
    </div >
  )
}