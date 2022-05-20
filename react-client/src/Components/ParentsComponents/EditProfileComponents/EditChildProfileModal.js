import { Modal, Button, CloseButton } from "react-bootstrap"
import EditChildForm from "./EditChildForm"

export default function EditChildProfileModal({ HandleDeleteChild, HandleEditChild, ShowEditChildProfileModal, CloseEditChildProfileModal }) {




  return (
    <div>
      <Modal show={ShowEditChildProfileModal} className="" centered dialogClassName="modal-dialog">
        <Modal.Body >
          <Modal.Title>
            <CloseButton style={{ marginLeft: "10px" }} onClick={CloseEditChildProfileModal}></CloseButton>
            <label>עריכת פרופיל</label>

          </Modal.Title>


          <EditChildForm HandleAddChild={HandleEditChild} CloseEditChildProfileModal={CloseEditChildProfileModal} />

        </Modal.Body>
        <Modal.Footer className="">
          <Button variant="danger" onClick={HandleDeleteChild}>מחיקת התקדמות</Button>
          <Button >עדכון</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
