import { Modal, Button } from 'react-bootstrap'

export default function ChildDeleteConfirmationModal({ ShowDeleteConfirmation, HandleDeleteConfirmation, CloseDeleteConfirmation }) {
  return (
    <Modal show={ShowDeleteConfirmation}>
      <div style={{ backgroundColor: "white" }}>

        <Modal.Header>
          <Modal.Title>מחיקת התקדמות</Modal.Title>
        </Modal.Header>
        <Modal.Body>(אין לשחזר פעולה זו)</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => CloseDeleteConfirmation()}>
            ביטול
          </Button>
          <Button variant="success" onClick={() => HandleDeleteConfirmation()}>
            אישור
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  )
}
