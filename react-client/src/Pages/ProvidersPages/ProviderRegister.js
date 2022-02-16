import '../../CSS/pages-css/Register.css'
import { Link } from "react-router-dom"
import { ValidateEmail, ValidatePassword, ValidateConfirmPassword, IsHebrewInputValid } from '../../Project-Modules/UserInputValidation'
import { useState } from 'react'
import FormInputField from '../../Components/GeneralComponents/FormInputField'
import { InputField } from '../../Project-Modules/UserInputValidation'

export default function ProviderRegister({ HandleProviderRegister }) {

  const [inputFields, setInputFields] = useState([
    new InputField("fullNameField", "", "שם מלא:", IsHebrewInputValid, "שם משתמש שגוי"),
    new InputField("emailField", "", "כתובת מייל:", ValidateEmail),
    new InputField("occupationField", "", "תעסוקה:", IsHebrewInputValid),
    new InputField("passwordField", "", "סיסמה:", ValidatePassword),
    new InputField("confirmPasswordField", "", "אשר סיסמה", ValidateConfirmPassword),
  ]);

  function OnSubmit(e) {
    e.preventDefault();

    ValidateInputFields();

    console.log(IsFormValid())
    HandleProviderRegister(e, IsFormValid())
  }



  /**
   * Validates all input fields
   * @returns void
   */
  function ValidateInputFields() {
    let newInputFields = [...inputFields];

    //  Validate every field
    newInputFields.forEach(inputField => {
      inputField.Validate();
    })

    //  Validate confirm password
    SetConfirmPasswordFieldIsValid(IsValidConfirmPasswordField());

    //  Update the input fields
    setInputFields(newInputFields);
  }



  /**
   * Sets the confirm password field to the given value
   * @param {bool} isValid 
   * @returns void
   */
  function SetConfirmPasswordFieldIsValid(isValid) {
    let newInputFields = [...inputFields];

    newInputFields.forEach(inputField => {
      if (inputField.name === "confirmPasswordField") {
        inputField.isValid = isValid;
      }
    })

    //  Update the input fields
    setInputFields(newInputFields);
  }



  /**
   * @returns Is the confirm password field valid
   */
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



  /**
   * Updates a specific field with the given value
   * @param {string} fieldName 
   * @param {any} newValue 
   * @returns void
   */
  function UpdateFieldValue(fieldName, newValue) {
    let newInputFields = [...inputFields];

    newInputFields.forEach(inputField => {
      if (inputField.name === fieldName) {
        inputField.value = newValue;
      }
    })

    setInputFields(newInputFields);
  }



  return (
    <div>

      <div className="RegisterContainer">
        <h1>הרשמה בתור בעל מקצוע</h1>
        <Link to="/Providers/Login" >התחברות בתור בעל מקצוע</Link>

        <form onSubmit={OnSubmit}>
          <div className="InputContainer">

            {
              inputFields.map((field, index) => {
                return (
                  <div key={index}>
                    <label>{field.labelText + " " + field.isValid}</label>
                    <br />
                    <FormInputField
                      Valid={field.isValid}
                      Name={field.name}
                      OnChange={(e) => { UpdateFieldValue(field.name, e.target.value) }}
                      UserErrorMessageText={field.textErrorMessage}
                    />
                  </div>
                )
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