import { useState } from "react";
import FormRange from "react-bootstrap/esm/FormRange";
import { IsInputValid_OnlyHebrew } from "../../../Project-Modules/UserInputValidation";
import FormInputField from "../../GeneralComponents/FormInputField";


const MIN_CHILD_AGE = 3;
const MAX_CHILD_AGE = 10;

export default function EditChildForm({ HandleAddChild, CloseEditChildProfileModal }) {
  let childNameValid = true;
  const [childName, setChildName] = useState("");
  const [childNameValidState, setChildNameValidState] = useState(true);

  const [childAgeDisplay, setChildAgeDisplay] = useState(MIN_CHILD_AGE)


  const OnSubmit = (e) => {
    e.preventDefault();

    childNameValid = IsInputValid_OnlyHebrew(childName);

    // If the name is valid close modal
    if (childNameValid) {
      CloseEditChildProfileModal();
    }
    setChildNameValidState(childNameValid);

    HandleAddChild(e, childNameValid)
  }


  return (
    <div>
      <form onSubmit={OnSubmit} >

        <div className="InputContainer d-flex flex-column justify-content-center align-items-start" >
          <FormInputField Label="שם הילד" MaxLength={15} Valid={childNameValidState} Name={"childNameField"} OnChange={(e) => setChildName(e.target.value)} />

          <div className="d-flex ">
            <label style={{ width: "70px" }}>גיל: {childAgeDisplay}</label>

            <FormRange
              name="childAgeSelect"
              step={1}
              tooltip="on"
              defaultValue={MIN_CHILD_AGE}
              min={MIN_CHILD_AGE}
              max={MAX_CHILD_AGE}
              onChange={(e) => setChildAgeDisplay(e.target.value)}
            />
          </div>

          <input type="submit" value="הוספה" />
        </div>
      </form>
    </div>
  )
}