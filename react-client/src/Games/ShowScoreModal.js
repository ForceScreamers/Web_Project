import { useHistory } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import ConvertSecondsToTime from '../TimeConvert';


export default function ShowScoreModal({ ShowScoreModal, CloseScoreModal, Score, Time }) {

  const history = useHistory();

  function CloseAndNavigateToGamesPage() {
    CloseScoreModal();
    history.push("/Parent/Games");
  }


  // function CloseAndNavigateToJournalPage() {
  //   CloseScoreModal();
  //   history.push("/Parent/Journal");
  // }


  return (
    <Modal show={ShowScoreModal}>
      <div style={{ backgroundColor: "white" }}>

        <Modal.Header className="d-flex justify-content-center">
          <Modal.Title>ניקוד</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: '500', fontSize: '20px' }}>
          זמן: {ConvertSecondsToTime(Time)}
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
      </div>
    </Modal>
  )
}
