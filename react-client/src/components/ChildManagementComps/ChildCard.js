import { Card, CloseButton, Button } from 'react-bootstrap'
function ChildCard({ IsSelectedChild, HandleSelectChild, HandleDeleteChild, specificChild }) {

  const isSelected = IsSelectedChild(specificChild.id);

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
            <CloseButton aria-label='מחיקה' onClick={() => HandleDeleteChild(specificChild.id)} /> {specificChild.name}

            <Button
              // disabled={isSelected ? "true" : "false"}
              disabled={isSelected}
              onClick={() => HandleSelectChild(specificChild)} variant="primary"
            >
              {isSelected ? "ילד נוכחי" : "בחר ילד"}
            </Button>

          </Card.Title>
          <Card.Text>
            {"גיל: " + specificChild.age}
          </Card.Text>


        </Card.Body>
      </Card>
    </div >
  )
}

export default ChildCard
