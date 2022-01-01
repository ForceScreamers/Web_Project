import { Card, CloseButton, Button } from 'react-bootstrap'
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
            <CloseButton aria-label='מחיקה' onClick={() => HandleDeleteChild(ChildProfile.id)} /> {ChildProfile.name}

            <Button
              // disabled={isSelected ? "true" : "false"}
              disabled={ChildProfile.isSelected}
              onClick={() => HandleSelectChild(ChildProfile)} variant="primary"
            >
              {ChildProfile.isSelected ? "ילד נוכחי" : "בחר ילד"}
            </Button>

          </Card.Title>
          <Card.Text>
            {"גיל: " + ChildProfile.age}
          </Card.Text>


        </Card.Body>
      </Card>
    </div >
  )
}

export default ChildCard
