import '../../CSS/pages-css/Register.css'
import { Link } from "react-router-dom"
import { ValidateEmail, ValidatePassword, ValidateConfirmPassword } from '../../Project-Modules/UserInputValidation'
import { useState } from 'react'
import { InputField } from '../../Project-Modules/UserInputValidation'
import FormInputFieldSection from '../../Components/GeneralComponents/FormInputFieldSection'
import { IsHebrewInputValid } from '../../Project-Modules/UserInputValidation'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import FormInputField from '../../Components/GeneralComponents/FormInputField'

import logo from '../../website-images/logo.png';

export default function ParentRegister({ HandleRegister, UserExists }) {

  const [inputFields, setInputFields] = useState([
    new InputField("registerUsernameField", "שם מלא", IsHebrewInputValid, "לא מתאים", "text"),
    new InputField("registerEmailField", "אי-מייל", ValidateEmail, "שגיאה", "text"),
    new InputField("registerPasswordField", "סיסמה", ValidatePassword, "ריק מתוכן", "password"),
    new InputField("registerPasswordConfirmField", "אשר סיסמה", ValidateConfirmPassword, "שגיאה", "password"),
  ]);

  const history = useHistory();

  function OnSubmit(e) {
    e.preventDefault();

    ValidateInputFields();

    HandleRegister(e, IsFormValid())
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
      if (inputField.name === "registerPasswordConfirmField") {
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
      if (field.name === "registerPasswordConfirmField") {
        passwordToCompare = field.value;
      }
    })

    return passwordToCompare;
  }



  function GetPassword() {
    let password = "";

    inputFields.forEach(field => {
      if (field.name === "registerPasswordField") {
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

			<img style={{ marginLeft: "-80%", marginTop: "20px" }}  alt="bambino-logo" src={logo} />

			<div className="parent-register-background-image register-container">
				<div className="register-title ">הרשמת הורים</div>

				<form onSubmit={OnSubmit}>

					<div className="register-inputs-container">
						{
							inputFields.map((field, index) => {
								return RenderInputField(field, index);
							})
						}

						<label className="user-doesnt-exist-label" >{UserExists ? "שם משתמש או סיסמה שגויים" : ""}</label>

						<div className="register-submit-button-container">

							<input className="register-submit-button" type="submit" value="הירשם" />
						</div>
					</div>
				</form>

			</div>

			<Button className="register-navigate-button" onClick={() => history.push("/")}>התחברות הורים</Button>
		</div >
  )
}


// <div>

// <div className="RegisterContainer">
  
//   <h1>הרשמת הורים</h1>
//   <Link to="/" >התחברות הורים</Link>

//   <form onSubmit={OnSubmit}>
//     <div className="InputContainer">

//       {
//         inputFields.map((field, index) => {
//           return RenderInputField(field, index);
//         })
//       }

//       <label className="user-exists-label" >{UserExists ? "משתמש זה קיים" : ""}</label>

//       <input type="submit" value="הירשם" />
//     </div>
//   </form>

// </div>
// </div>