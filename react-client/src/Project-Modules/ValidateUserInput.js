import { USER_INPUT_ERR } from "./UserErrorEnums";

export const REXGEX_OnlyHebrew = new RegExp(/^[\u0590-\u05FF]+$/)

/**
 * Returns true if given input is valid (No special characters)
 * Takes a string input and the language to check 
 * lang parameter "Heb" => Hebrew
 * lang parameter "Eng" => English
*/
export function ValidateUserInput(input, lang) {
  let result;
  if (lang === "Heb" && IsInputValid_OnlyHebrew(input)) { result = true }
  if (lang === "Eng" && ValidateUserInput_Eng(input)) { result = true }
  return result;
}

//  Returns true if the input contains only english characters and spaces
function ValidateUserInput_Eng(input) {
  return (/[a-zA-Z\s]/).test(input)
}

//  Returns true if the input contains only hebrew characters and spaces
export function IsInputValid_OnlyHebrew(input) {
  return (/^[\u0590-\u05FF]+$/).test(input);
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


//TODO: Change name to ValidateRegisterForm
/**
 * Returns error
 */
export const ValidateRegisterInput = (userData) => {
  let emailValid, passwordValid, usernameValid, confirmPasswordValid = false;

  //  Check if each one is valid
  emailValid = ValidateEmail(userData.email);
  passwordValid = ValidatePassword(userData.password);
  usernameValid = ValidateUsername(userData.username);
  confirmPasswordValid = ValidateConfirmPassword(userData.confirmPassword);

  let errorsToLoad = [emailValid, passwordValid, usernameValid, confirmPasswordValid];
  let resultErrors = [];
  errorsToLoad.forEach((err) => {
    if (err !== USER_INPUT_ERR.VALID) {
      resultErrors.push(err);
    }
  })

  return {
    errors: resultErrors,
    isValid: resultErrors.length === 0,
  };
}

export const ValidateLoginInput = (userData) => {
  let emailValid, passwordValid = false;

  emailValid = ValidateEmail(userData.email);
  passwordValid = ValidatePassword(userData.password);

  return emailValid && passwordValid;
}

export const ValidateConfirmPassword = (password, passwordToCompare) => {
  return password === passwordToCompare && password !== "" && passwordToCompare !== "";
}

/**
 * Returns true or false whether the username isn't empty or is a special character
 */
export const ValidateUsername = (username) => {
  return ValidateUserInput_All(username);
}

//TODO: Make all functions is this file match this function's pattern
/**
 * @param {string} input 
 * @returns true or false whether the input is in hebrew or isn't empty
 */
export function IsHebrewInputValid(input) {

  return IsInputValid_OnlyHebrew(input) && input !== "";
}

/**
 * Returns true or false whether the password isn't empty
 */
export const ValidatePassword = (password) => {

  let valid = false;
  if (password !== "") {
    valid = true;
  }
  else {
    // alert("empty password")
  }

  return valid;
}

/**
 * Returns true or false whether the email isn't empty or doesn't have special characters
 */
export const ValidateEmail = (email) => {

  let valid = false;
  if (email !== "") {
    if (EmailRegexCheck(email)) {
      valid = true;
    }
    else {
      //	Email is invalid
    }
  }
  else {
    //	Email is empty
  }

  return valid;
};



