import { Card, CloseButton, Button } from 'react-bootstrap'
import '../../components-styles/button-styles.scss'
import ChildEvaluationsDisplay from './ChildEvaluationsDisplay'
function ChildCard({ HandleSelectChild, HandleDeleteChild, ChildProfile }) {

  return (
    <div>
      <Card
        bg={"white"}
        key={1}
        border={"dark"}
        text={"dark" /*Can be light or dark*/}
        style={{ width: '30rem' }}
        className="mb-3"
      >

        <Card.Body>
          <Card.Title>

            <div className="select-child-card-title-container">
              <CloseButton aria-label='מחיקה' onClick={(e) => HandleDeleteChild(e, ChildProfile.Id)} />

              {ChildProfile.Name}

              <Button
                className='select-child-button'
                // disabled={isSelected ? "true" : "false"}
                disabled={ChildProfile.IsSelected}
                onClick={(e) => HandleSelectChild(e, ChildProfile)} variant="primary"
              >

                {ChildProfile.IsSelected ? "ילד נוכחי" : "בחר ילד"}

              </Button>

            </div>
          </Card.Title>
          <Card.Text>

            {"גיל: " + ChildProfile.Age}
          </Card.Text>

          <ChildEvaluationsDisplay Evaluations={ChildProfile.Evaluations} />


        </Card.Body>
      </Card>
    </div >
  )
}

export default ChildCard
