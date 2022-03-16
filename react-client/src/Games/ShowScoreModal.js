import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function ShowScoreModal({ ShowScoreModal, CloseScoreModal, Score }) {


  //  Setting as a variable so its value won't change 

  return (
    <Modal show={ShowScoreModal} >
      <Modal.Header>
        <Modal.Title>ניקוד</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ניקוד למשחק זה: {Score}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={() => CloseScoreModal()}>
          אישור
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
