import '../../CSS/pages-css/Login.css'

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ValidateEmail, ValidatePassword } from '../../Project-Modules/UserInputValidation';
import { InputField } from '../../Project-Modules/UserInputValidation';
import FormInputFieldSection from '../../Components/GeneralComponents/FormInputFieldSection';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import FormInputField from '../../Components/GeneralComponents/FormInputField';


export default function ParentLogin({ HandleLogin, UserExists }) {

	const [inputFields, setInputFields] = useState([
		new InputField("loginEmailField", "אי-מייל", ValidateEmail, "שגיאה", "text"),
		new InputField("loginPasswordField", "סיסמה", ValidatePassword, "ריק מתוכן", "password"),
	])

	const history = useHistory();

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
				<FormInputField
					FormType="Login"
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
		<div className="login-main-container">

			<div className="parent-login-background-image login-container">
				<div className="login-title ">כניסת הורים</div>

				<form onSubmit={OnSubmit}>

					<div className="login-inputs-container">
						{
							inputFields.map((field, index) => {
								return RenderInputField(field, index);
							})
						}

						<label className="user-doesnt-exist-label" >{UserExists ? "שם משתמש או סיסמה שגויים" : ""}</label>

						<div className="login-submit-button-container">

							<input className="login-submit-button" type="submit" value="התחבר" />
						</div>
					</div>
				</form>

			</div>

			<Button className="login-navigate-button" onClick={() => history.push("/Parent/Register")}>הרשמה</Button>
			<Button className="login-navigate-button" onClick={() => history.push("/Provider/Login")}>התחבר כבעל מקצוע</Button>
		</div >
	)
}