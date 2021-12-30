import { USER_INPUT_ERR } from "./UserErrorEnums";

/**
 * Returns true if given input is valid (No special characters)
 * Takes a string input and the language to check 
 * lang parameter "Heb" => Hebrew
 * lang parameter "Eng" => English
*/
export function ValidateUserInput(input, lang) {
  let result;
  if (lang === "Heb" && ValidateUserInput_Heb(input)) { result = true }
  if (lang === "Eng" && ValidateUserInput_Eng(input)) { result = true }
  return result;
}

//  Returns true if the input contains only english characters and spaces
function ValidateUserInput_Eng(input) {
  return (/[a-zA-Z\s]/).test(input)
}

//  Returns true if the input contains only hebrew characters and spaces
function ValidateUserInput_Heb(input) {
  return ((/[\u0590-\u05FF\s]/).test(input))
}

//  Returns true if the input contains only numbers
function ValidateUserInput_Num(input) {
  return (/[0-9]/).test(input);
}

//  ? Don't know
function ValidateUserInput_All(input) {
  return (/[0-9\u0590-\u05FF\s]/).test(input);
}


function EmailRegexCheck(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}



export const ValidateRegisterInput = (userData) => {
  let emailValid, passwordValid, usernameValid, confirmPasswordValid = false;

  //  Check if each one is valid
  emailValid = ValidateEmail(userData.email);
  passwordValid = ValidatePassword(userData.password);
  usernameValid = ValidateUsername(userData.username);
  confirmPasswordValid = ValidateConfirmPassword(userData.confirmPassword);

  return emailValid && passwordValid && usernameValid;
}

export const ValidateLoginInput = (userData) => {
  let emailValid, passwordValid = false;

  emailValid = ValidateEmail(userData.email);
  passwordValid = ValidatePassword(userData.password);

  return emailValid && passwordValid;
}

const ValidateConfirmPassword = (password1, password2) => {
  return password1 === password2;
}

/**
 * Returns true or false whether the username isn't empty or is a special character
 */
const ValidateUsername = (username) => {
  let valid = USER_INPUT_ERR.VALID;

  if (username !== "") {
    if (ValidateUserInput_All(username)) {
      valid = true;
    }
    else {
      valid = USER_INPUT_ERR.USERNAME_INVALID;
    }
  }
  else {
    valid = USER_INPUT_ERR.USERNAME_EMPTY;
  }

  return valid;
}

/**
 * Returns true or false whether the password isn't empty
 */
const ValidatePassword = (password) => {

  let valid = false;
  if (password !== "") {
    valid = true;
  }
  else {
    alert("empty password")
  }

  return valid;
}

/**
 * Returns true or false whether the email isn't empty or doesn't have special characters
 */
const ValidateEmail = (email) => {

  let valid = false;
  if (email !== "") {
    if (EmailRegexCheck(email)) {
      valid = true;
    }
    else {
      //	Email is invalid
      alert("invalid email");
    }
  }
  else {
    //	Email is empty
    alert("empty email");
  }

  return valid;
};



