import '../../CSS/pages-css/ParentLogin.css'

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ValidateEmail, ValidatePassword } from '../../Project-Modules/UserInputValidation';
import { InputField } from '../../Project-Modules/UserInputValidation';
import FormInputFieldSection from '../../Components/GeneralComponents/FormInputFieldSection';
import { Button } from 'react-bootstrap';


export default function ParentLogin({ HandleLogin, UserExists }) {

	const [inputFields, setInputFields] = useState([
		new InputField("loginEmailField", "כתובת מייל:", ValidateEmail, "שגיאה", "text"),
		new InputField("loginPasswordField", "סיסמה:", ValidatePassword, "ריק מתוכן", "password"),
	])

	const OnSubmit = (e) => {
		e.preventDefault();

		ValidateInputFields();

		HandleLogin(e, IsFormValid());
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
				<FormInputFieldSection
					Label={field.labelText}
					Valid={field.isValid}
					Name={field.name}
					OnChange={(e) => { UpdateFieldValue(field.name, e.target.value) }}
					UserErrorMessageText={field.textErrorMessage}
					Type={field.type}
				/>
				{/* <br /> */}
			</div>
		)
	}

	return (
		<div className="parent-login-main-container">

			<div className="login-container">
				<div className="parent-login-title">התחברות הורים</div>

				<form onSubmit={OnSubmit}>

					<div className="InputContainer">
						{
							inputFields.map((field, index) => {
								return RenderInputField(field, index);
							})
						}

						<label className="user-doesnt-exist-label" >{UserExists ? "שם משתמש או סיסמה שגויים" : ""}</label>

						<input type="submit" value="התחברות" />
					</div>
				</form>

			</div>

			<Link to="/Parent/Register" >הרשמת הורים</Link>
			<Link to="/Provider/Login" >התחברות בתור בעל מקצוע</Link>
		</div>
	)
}