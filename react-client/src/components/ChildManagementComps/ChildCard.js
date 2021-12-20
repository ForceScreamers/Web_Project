import { Card, CloseButton } from 'react-bootstrap'
function ChildCard({ HandleDeleteChild, name, age, id }) {
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
          <Card.Title><CloseButton aria-label='מחיקה' onClick={() => HandleDeleteChild(id)} /> {name} </Card.Title>
          <Card.Text>
            {"גיל: " + age}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default ChildCard
