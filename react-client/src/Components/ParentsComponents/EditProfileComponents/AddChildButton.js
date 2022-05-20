import { Card } from "react-bootstrap"
import AddChildForm from "./AddChildForm"
import addChildIcon from '../../../website-images/child-profile-add-icon.png'

export default function AddChildButton({ HandleAddChild, DisplayAddChildProfileModal }) {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ marginTop: "200px" }}>
      <img alt="add-child" onClick={DisplayAddChildProfileModal} src={addChildIcon} width={100} className="add-child-profile-button" />
    </div>
  )
}

// <Card
//         bg={"light"}
//         key={1}
//         border={"dark"}
//         text={"dark" /*Can be light or dark*/}
//         style={{ width: '15rem' }}
//         className="mb-3 d-flex justify-content-start"
//       >
//         <Card.Header>הוספת ילד/ה</Card.Header>
//         <Card.Body>
//           <Card.Text as="div">
//             <AddChildForm HandleAddChild={HandleAddChild} />
//           </Card.Text>
//         </Card.Body>
//       </Card>