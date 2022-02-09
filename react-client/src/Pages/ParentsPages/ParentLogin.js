//TODO: Add verify inputs as a function to import (a function that is not in this file)
import '../../CSS/pages-css/Login.css';

import { Link } from 'react-router-dom';
import FormInputField from '../../Components/GeneralComponents/FormInputField';
import { useState } from 'react';
import { ValidateEmail, ValidatePassword } from '../../Project-Modules/ValidateUserInput';

export default function ParentLogin({ HandleLogin }) {
	let emailValid = true;
	let passwordValid = true;

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [emailValidState, setEmailValidState] = useState(true);
	const [passwordValidState, setPasswordValidState] = useState(true);

	const OnSubmit = (e) => {
		e.preventDefault();

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

			<h1>התחברות הורים</h1>
			<Link to="/Parents/Register" >הרשמת הורים</Link>

			<form onSubmit={OnSubmit}>

				<div className="InputContainer">
					<label>אי-מייל:</label>
					<FormInputField Valid={emailValidState} Name={"loginEmailField"} OnChange={(e) => { onChangeHandler("email", e.target.value) }} />

					<label>סיסמה:</label>
					<FormInputField Valid={passwordValidState} Name={"loginPasswordField"} OnChange={(e) => { onChangeHandler("password", e.target.value) }} />

					<input type="submit" value="התחברות" />
				</div>
			</form>

			{/* <Button variant='link' onClick={() => history.replace('/Providers/Login')} >התחברות בתור בעל מקצוע</Button> */}
			<Link to="/Providers/Login" >התחברות בתור בעל מקצוע</Link>

		</div>
	)
}