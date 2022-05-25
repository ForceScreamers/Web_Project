import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

export default function NoEvaluationsMessage() {
  const history = useHistory();

  return (
    <div className='d-flex justify-content-center flex-column align-items-center mt-5'>
      <div className="no-children-message-container">
        <h1 >התחל לשחק כדי לעקוב אחר ההתקדמות שלך!</h1>
      </div>
      <br />
      <Button className="no-children-message-button" onClick={() => history.push("/Parent/Games")}>למשחקייה</Button>
    </div>
  )
}