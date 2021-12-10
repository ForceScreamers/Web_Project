import { Card, CloseButton } from 'react-bootstrap'
function ChildCard({ name, age }) {
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
          <Card.Title><CloseButton /> {name} </Card.Title>
          <Card.Text>
            {age}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default ChildCard
