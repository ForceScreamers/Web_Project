import { Modal, Button } from "react-bootstrap"
import AddChildForm from "./AddChildForm"

export default function AddChildProfileModal({ HandleAddChild, ShowAddChildProfileModal, CloseAddChildProfileModal }) {
  return (
    <div>
      <Modal show={ShowAddChildProfileModal} className="" centered dialogClassName="modal-dialog">
        <Modal.Body >
          <Modal.Title>הוספת ילד</Modal.Title>
          <AddChildForm HandleAddChild={HandleAddChild} CloseChildProfileModal={CloseAddChildProfileModal} />
        </Modal.Body>
        <Modal.Footer className="">
          <Button onClick={CloseAddChildProfileModal}>יציאה</Button>
        </Modal.Footer>
      </Modal>
    </div>

  )
}
