


//TODO: Add verify inputs as a function to import (a function that is not in this file)
import { FormCheck, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import '../../CSS/pages-css/Login.css';

import { Link, useHistory } from 'react-router-dom';
import FormInputField from '../../Components/GeneralComponents/FormInputField';
import { useState } from 'react';
import { ValidateEmail, ValidatePassword } from '../../Project-Modules/ValidateUserInput';
import { Button } from 'react-bootstrap';

import { USER_TYPE } from '../../GlobalConstants';

export default function Login({ HandleLogin }) {

  let emailValid = true;
  let passwordValid = true;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailValidState, setEmailValidState] = useState(true);
  const [passwordValidState, setPasswordValidState] = useState(true);

  const OnSubmit = (e) => {
    e.preventDefault();

    console.log("E")

    emailValid = ValidateEmail(email);
    passwordValid = ValidatePassword(password);

    setEmailValidState(emailValid)
    setPasswordValidState(passwordValid)

    HandleLogin(e, emailValid && passwordValid);
  }

  const onChangeHandler = (fieldName, value) => {
    console.log("test")
    if (fieldName === "email") {
      setEmail(value);
    }
    else if (fieldName === "password") {
      setPassword(value);
    }
  }

  return (
    <div className="LoginContainer">

      <h1>התחברות</h1>


      <form onSubmit={OnSubmit}>

        <div className="InputContainer">
          <label>אי-מייל:</label>
          <FormInputField Valid={emailValidState} Name={"loginEmailField"} OnChange={(e) => { onChangeHandler("email", e.target.value) }} />

          <label>סיסמה:</label>
          <FormInputField Valid={passwordValidState} Name={"loginPasswordField"} OnChange={(e) => { onChangeHandler("password", e.target.value) }} />

          {/* TODO: Turn into component */}
          <div>
            <label >הורה</label>
            <input defaultChecked type={"radio"} value={USER_TYPE.PARENT} name='userType' />
            <br />
            <Link to="/Parents/Register" >הרשמת הורים</Link>
          </div>
          <br />
          <div>
            <label>בעל מקצוע</label>
            <input type={"radio"} value={USER_TYPE.PROVIDER} name='userType' />
            <br />
            <Link to="/Providers/Register" >הרשמת בעלי מקצוע</Link>
          </div>

          <input type="submit" value="התחברות" />
        </div>

      </form>

    </div>
  )
}