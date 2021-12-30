
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


// function ValidateUserInput_Num(input) {
//   return (/[0-9]/).test(input);
// }


export function EmailRegexCheck(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

