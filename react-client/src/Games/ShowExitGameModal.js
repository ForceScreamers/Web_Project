import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function ShowExitGameModal({ ShowExitGameModal, CloseExitGameModal }) {


  //  Setting as a variable so its value won't change 
  // const time = Time;

  return (
    <Modal show={ShowExitGameModal} >
      <Modal.Header>
        <Modal.Title>ניקוד</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        היציאה מהמשחק לא שומרת את הניקוד שהושג
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => CloseExitGameModal()}>
          יציאה
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
