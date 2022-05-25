import { Modal, Button, CloseButton } from "react-bootstrap"
import { ParentsApiRequest } from "../../../RequestHeadersToWebApi"
import EditChildForm from "./EditChildForm"
import utf8 from 'utf8';
import { useEffect } from "react";

export default function EditChildProfileModal({ HandleDeleteChild, HandleEditChild, ShowEditChildProfileModal, CloseEditChildProfileModal, ChildName, LoadChildrenFromServer }) {

  async function UpdateChildProfile(e, childNameValid) {
    if (childNameValid) {
      let newChildInfo = {
        childId: 0,
        childAge: utf8.encode(e.target.editChildAgeSelect.value),
        childName: utf8.encode(e.target.editChildNameField.value)
      }
      await ParentsApiRequest("POST", "UpdateChildInfo", newChildInfo);
      LoadChildrenFromServer();
    }
  }

  return (
    <div>
      <Modal show={ShowEditChildProfileModal} className="" centered dialogClassName="modal-dialog">
        <div style={{ backgroundColor: "white" }}>

          <Modal.Body >
            <Modal.Title>
              <CloseButton style={{ marginLeft: "10px" }} onClick={CloseEditChildProfileModal}></CloseButton>
              <label>עריכת פרופיל</label>

            </Modal.Title>


            <EditChildForm UpdateChildProfile={UpdateChildProfile} ChildName={ChildName} CloseEditChildProfileModal={CloseEditChildProfileModal} />

          </Modal.Body>
          <Modal.Footer className="">
            <Button variant="danger" onClick={HandleDeleteChild}>מחיקת התקדמות</Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div >
  )
}