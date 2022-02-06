import '../../CSS/pages-css/Register.css'
import { Link } from "react-router-dom"
import { USER_INPUT_ERR } from '../../Project-Modules/UserErrorEnums'
import { ValidateUsername, ValidateEmail, ValidatePassword, ValidateConfirmPassword, IsHebrewInputValid } from '../../Project-Modules/ValidateUserInput'
import { useState, useEffect } from 'react'
import FormInputField from '../../Components/GeneralComponents/FormInputField'

class InputField {
  constructor(fieldName, value, labelText) {
    this.name = fieldName;
    this.value = value;
    this.isValid = true;
    this.labelText = labelText;
  }
}

export default function ProviderRegister({ HandleProviderRegister }) {
  const [test, setTest] = useState("false");

  const [inputFields, setInputFields] = useState([
    new InputField("fullNameField", "", "שם מלא:"),
    new InputField("emailField", "", "כתובת מייל:"),
    new InputField("occupationField", "", "תעסוקה:"),
    new InputField("passwordField", "", "סיסמה:"),
    new InputField("confirmPasswordField", "", "אשר סיסמה"),
  ]);

  function ValidateInputFields() {
    let newInputFields = [...inputFields];

    newInputFields.forEach(inputField => {

      switch (inputField.name) {
        case "fullNameField":
          inputField.isValid = IsHebrewInputValid(inputField.value);

          break;
        case "emailField":
          inputField.isValid = ValidateEmail(inputField.value);

          break;
        case "passwordField":
          inputField.isValid = ValidatePassword(inputField.value);

          break;
        case "occupationField":
          inputField.isValid = IsHebrewInputValid(inputField.value);

          break;
        case "confirmPasswordField":
          inputField.isValid = ValidateConfirmPassword(inputField.value, GetPassword());

          break;

        //TODO: Check if the default is needed
        // default:
        //   break;
      }
    })

    setTest("true");
    setInputFields(newInputFields);
  }

  function GetPassword() {
    let password = "";

    inputFields.forEach(field => {
      if (field.name === "passwordField") {
        password = field.value;
        console.log(field)
      }
    })
    return password;
  }


  function OnSubmit(e) {
    e.preventDefault();

    ValidateInputFields();

    //  Test inputs
    // console.log(inputFields)


    console.log(IsFormValid())
    HandleProviderRegister(e, IsFormValid())
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
                    <FormInputField Valid={field.isValid} Name={field.name} OnChange={(e) => { UpdateFieldValue(field.name, e.target.value) }} />
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