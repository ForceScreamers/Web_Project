import { useHistory } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'



export default function ShowScoreModal({ ShowScoreModal, CloseScoreModal, Score, Time }) {

  const history = useHistory();

  //  Setting as a variable so its value won't change 
  let time = 0;

  function CloseAndNavigateToGamesPage() {
    CloseScoreModal();
    history.push("/Parent/Games");
  }

  function CloseAndNavigateToJournalPage() {
    CloseScoreModal();
    history.push("/Parent/Journal");
  }

  console.log(time)
  return (
    <Modal show={ShowScoreModal}>
      <Modal.Header className="d-flex justify-content-center">
        <Modal.Title>ניקוד</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontWeight: '500', fontSize: '20px' }}>
        זמן: {Time}
        <br />
        ניקוד: {Score}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <Button style={{ backgroundColor: 'purple' }} onClick={() => CloseAndNavigateToGamesPage()}>
          חזרה למשחקייה
        </Button>
        {/* <Button variant="primary" onClick={() => CloseAndNavigateToJournalPage()}>
          ליומן שלי
        </Button> */}
      </Modal.Footer>
    </Modal>
  )
}
