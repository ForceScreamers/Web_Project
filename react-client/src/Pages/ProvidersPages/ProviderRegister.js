import '../../CSS/pages-css/Register.css'
import { Link } from "react-router-dom"
import { ValidateEmail, ValidatePassword, ValidateConfirmPassword, IsHebrewInputValid } from '../../Project-Modules/UserInputValidation'
import { useState } from 'react'
import { InputField } from '../../Project-Modules/UserInputValidation'
import FormInputFieldSection from '../../Components/GeneralComponents/FormInputFieldSection'
import WaitForConfirmationModal from './ProviderRegisterFiles/WaitForConfirmationModal'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { Button } from 'react-bootstrap'
import FormInputField from '../../Components/GeneralComponents/FormInputField'

export default function ProviderRegister({ HandleProviderRegister, UserExistsError, ShowWaitForConfirmationModal, CloseWaitForConfirmationModal }) {

  const [inputFields, setInputFields] = useState([
    new InputField("fullNameField", "שם מלא:", IsHebrewInputValid, "לא מתאים", "text"),
    new InputField("emailField", "כתובת מייל:", ValidateEmail, "שגיאה", "text"),
    new InputField("occupationField", "תעסוקה:", IsHebrewInputValid, "שגיאה", "text"),
    new InputField("passwordField", "סיסמה:", ValidatePassword, "ריק מתוכן", "password"),
    new InputField("confirmPasswordField", "אשר סיסמה:", ValidateConfirmPassword, "שגיאה", "password"),
  ]);

  const history = useHistory();

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
        <FormInputField
          FormType="Register"
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
    <div className="register-main-container">

      <div className="provider-register-background-image register-container">
        <div className="register-title ">הרשמת בעלי מקצוע</div>

        <form onSubmit={OnSubmit}>

          <div className="register-inputs-container">
            {
              inputFields.map((field, index) => {
                return RenderInputField(field, index);
              })
            }

            <label className="user-doesnt-exist-label" >{UserExistsError ? "שם משתמש או סיסמה שגויים" : ""}</label>

            <div className="register-submit-button-container">

              <input className="register-submit-button" type="submit" value="הירשם" />
            </div>
          </div>
        </form>

      </div>

      <WaitForConfirmationModal ShowModal={ShowWaitForConfirmationModal} CloseModal={CloseWaitForConfirmationModal} />

      <Button className="register-navigate-button" onClick={() => history.push("/Provider/Login")}>התחברות בעלי מקצוע</Button>
    </div >
  )
}

// <div>

// <div className="RegisterContainer">
//   <h1>הרשמה בתור בעל מקצוע</h1>
//   <Link to="/Provider/Login" >התחברות בתור בעל מקצוע</Link>

//   <form onSubmit={OnSubmit}>
//     <div className="InputContainer">

//       {
//         inputFields.map((field, index) => {
//           return RenderInputField(field, index);
//         })
//       }

//       <label className="user-exists-label" >{UserExistsError ? "מייל כבר נמצא בשימוש" : ""}</label>

//       <input type="submit" value="Register" />
//     </div>
//   </form>
//   <Link to="/" >התחברות בתור הורה</Link>

// </div>

// <WaitForConfirmationModal ShowModal={ShowWaitForConfirmationModal} CloseModal={CloseWaitForConfirmationModal} />
// </div >