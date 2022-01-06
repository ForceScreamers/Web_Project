import { Card, CloseButton, Button } from 'react-bootstrap'
import '../components-styles/button-styles.scss'
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
            <CloseButton aria-label='מחיקה' onClick={(e) => HandleDeleteChild(e, ChildProfile.Id)} /> {ChildProfile.Name}

            <Button
              className='test-class'
              // disabled={isSelected ? "true" : "false"}
              disabled={ChildProfile.IsSelected}
              onClick={(e) => HandleSelectChild(e, ChildProfile)} variant="primary"
            >
              {ChildProfile.IsSelected ? "ילד נוכחי" : "בחר ילד"}
            </Button>

          </Card.Title>
          <Card.Text>
            {"גיל: " + ChildProfile.Age}
          </Card.Text>


        </Card.Body>
      </Card>
    </div >
  )
}

export default ChildCard
