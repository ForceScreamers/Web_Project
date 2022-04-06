import { USER_INPUT_ERR } from "./UserErrorEnums";


export class InputField {

  constructor(name, labelText, validationFunction, testErrorMessage, type) {
    this.name = name;
    this.value = "";
    this.isValid = true;
    this.labelText = labelText;
    this.validationFunction = validationFunction;
    this.textErrorMessage = testErrorMessage;
    this.type = type;
  }

  Validate() {
    this.isValid = this.validationFunction(this.value);
  }
}


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







//  Returns true if the input contains only numbers
function ValidateUserInput_Num(input) {
  return (/[0-9]/).test(input);
}







//  Returns true if the input contains only hebrew characters and the space char "\u0020"
export function IsInputValid_OnlyHebrew(input) {
  return (/^[\u0590-\u05FF\u0020]+$/).test(input);
}

//  Returns true if the input contains only english characters and spaces
function ValidateUserInput_Eng(input) {
  return (/[a-zA-Z\s]/).test(input)
}


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

  //    /\____/\
  //  / o   o  \
  // \    ~   /  
  // \ ____ /

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

export function IsHebrewInputValid(input) {

  return IsInputValid_OnlyHebrew(input) && input !== "";
}

/**
 * Returns true or false whether or not the password is empty
 */
export const ValidatePassword = (password) => {
  let valid = false;
  if (password !== "") {
    valid = true;
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





