import { useState } from "react";
import { IsInputValid_OnlyHebrew } from "../../../Project-Modules/UserInputValidation";
import FormInputField from "../../GeneralComponents/FormInputField";

function AddChildForm({ HandleAddChild }) {
  let childNameValid = true;
  const [childName, setChildName] = useState("");
  const [childNameValidState, setChildNameValidState] = useState(true);

  const OnSubmit = (e) => {
    e.preventDefault();

    childNameValid = IsInputValid_OnlyHebrew(childName);

    setChildNameValidState(childNameValid);

    HandleAddChild(e, childNameValid)
  }


  return (
    <div>
      <form onSubmit={OnSubmit} >

        <div className="InputContainer d-flex flex-column justify-content-center align-items-start" >
          <label>שם:</label>

          <FormInputField Valid={childNameValidState} Name={"childNameField"} OnChange={(e) => setChildName(e.target.value)} />

          <label>גיל:</label>
          <select name="childAgeSelect">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>

          <input type="submit" value="הוספה" />
        </div>
      </form>
    </div>
  )
}

export default AddChildForm
