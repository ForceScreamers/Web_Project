import { Card } from "react-bootstrap"
import AddChildForm from "./AddChildForm"

function AddChildCard({ HandleAddChild }) {
  return (
    <div>
      <Card
        bg={"light"}
        key={1}
        border={"dark"}
        text={"dark" /*Can be light or dark*/}
        style={{ width: '15rem' }}
        className="mb-3 d-flex justify-content-start"
      >
        <Card.Header>הוספת ילד/ה</Card.Header>
        <Card.Body>
          <Card.Text as="div">
            <AddChildForm HandleAddChild={HandleAddChild} />
          </Card.Text>
        </Card.Body>
      </Card>

    </div>
  )
}

export default AddChildCard
