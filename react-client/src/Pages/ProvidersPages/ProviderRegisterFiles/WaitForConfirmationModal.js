import { Modal, Button } from "react-bootstrap"

export default function WaitForConfirmationModal({ ShowModal, CloseModal }) {

  return (
    <div >
      <Modal show={ShowModal} style={{ marginTop: "100px" }}>
        <Modal.Header className="d-flex justify-content-center" style={{ height: "100px" }}>
          <Modal.Title>המתן לאישור כניסה</Modal.Title>
        </Modal.Header>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="success" onClick={() => CloseModal()}>
            אישור
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
