import { Container, Row, Col } from "react-bootstrap"
import AddChildCard from "../components/ChildManagementComps/AddChildCard"
import ChildCard from "../components/ChildManagementComps/ChildCard"
import MainPage from "../components/MainPage"

import { useEffect, useState } from "react"


function EditProfile({ HandleDeleteChild, HandleAddChild, children_: childrenProfiles }) {
  //const [childrenProfiles, setChildrenProfiles] = useState([])


  useEffect(() => {
    console.log("Updating children")
  }, [childrenProfiles])

  return (
    <div>
      <MainPage title='עריכת פרופיל'>
        <h1>רשימת ילדים</h1>
        <Container fluid className="d-flex justify-content-around align-center">
          <Row>
            <Col>

              {
                //  i - index inside the state array, using it because react wants to use it...
                childrenProfiles.map((child) => (
                  <ChildCard HandleDeleteChild={HandleDeleteChild} key={child.id} id={child.id} name={child.name} age={child.age} />
                ))

              }
              <AddChildCard HandleAddChild={HandleAddChild} />

            </Col>
          </Row>

          <Row></Row>
          <Row></Row>


        </Container>
      </MainPage>
    </div>
  )
}

export default EditProfile
