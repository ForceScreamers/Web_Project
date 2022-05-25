import '../../CSS/pages-css/Login.css';

import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ValidateEmail, ValidatePassword } from '../../Project-Modules/UserInputValidation';
import { InputField } from '../../Project-Modules/UserInputValidation';
import FormInputFieldSection from '../../Components/GeneralComponents/FormInputFieldSection';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import FormInputField from '../../Components/GeneralComponents/FormInputField';
import logo from '../../website-images/logo.png';

export default function ProviderLogin({ HandleProviderLogin, UserExistsError }) {

  const [inputFields, setInputFields] = useState([
    new InputField("loginEmailField", "אי-מייל", ValidateEmail, "שגיאה", "text"),
    new InputField("loginPasswordField", "סיסמה", ValidatePassword, "ריק מתוכן", "password"),
  ])

  const history = useHistory();

  const OnSubmit = (e) => {
    e.preventDefault();

    ValidateInputFields();

    HandleProviderLogin(e, IsFormValid());
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

  function ValidateInputFields() {
    let newInputFields = [...inputFields];

    //  Validate every field
    newInputFields.forEach(inputField => {
      inputField.Validate();
    })


    setInputFields(newInputFields);
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
          FormType="Login"
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
    <div className="login-main-container">

      <img style={{ marginLeft: "-80%", marginTop: "20px" }} alt="bambino-logo" src={logo} />

      <div className="provider-login-background-image login-container">
        <div className="login-title">כניסת בעלי מקצוע</div>

        <form onSubmit={OnSubmit}>

          <div className="login-inputs-container">
            {
              inputFields.map((field, index) => {
                return RenderInputField(field, index);
              })
            }

            <label className="user-doesnt-exist-label" >{UserExistsError ? "שם משתמש או סיסמה שגויים" : ""}</label>

            <div className="login-submit-button-container">

              <input className="login-submit-button" type="submit" value="התחבר" />
            </div>
          </div>
        </form>

      </div>

      <Button className="login-navigate-button" onClick={() => history.push("/Provider/Register")}>הרשמה</Button>
      <Button className="login-navigate-button" onClick={() => history.push("/")}>התחבר כהורה</Button>
    </div >
  )
}


// <div className="login-main-container">

// <h1>התחברות בתור בעל מקצוע</h1>
// <Link to="/Provider/Register" >הרשמה בתור בעל מקצוע</Link>

// <form onSubmit={OnSubmit}>
//   <div className="InputContainer">
//     {
//       inputFields.map((field, index) => {
//         return RenderInputField(field, index);
//       })
//     }


//     <label className="user-doesnt-exist-label" >{UserExistsError ? "לא מורשה להתחבר" : ""}</label>

//     <input type="submit" value="התחברות" />
//   </div>
// </form>

// <Link to="/" >התחברות בתור הורה</Link>
// </div>