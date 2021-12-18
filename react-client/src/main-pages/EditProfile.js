import { Container, Row, Col } from "react-bootstrap"
import AddChildCard from "../components/ChildManagementComps/AddChildCard"
import ChildCard from "../components/ChildManagementComps/ChildCard"
import MainPage from "../components/MainPage"

import { useEffect, useState } from "react"


function EditProfile({ HandleDeleteChild, HandleAddChild, children_: childrenProfiles }) {
  //const [childrenProfiles, setChildrenProfiles] = useState([])

  useEffect(() => {
    formatChildren();

  }, [])

  const formatChildren = () => {
    console.log(childrenProfiles)

    childrenProfiles.forEach((child) => {
      // child.name = child.child_name;
      // child.age = child.child_age;
      // child.key = child.child_id;

      // delete child.child_id;
      // delete child.child_name;
      // delete child.child_age;
    })
  }

  return (
    <div>
      <MainPage title='עריכת פרופיל'>
        <h1>רשימת ילדים</h1>
        <Container fluid className="d-flex justify-content-around align-center">
          <Row>
            <Col>

              {

                childrenProfiles.map((child, i) => (
                  <ChildCard key={i} name={child.name} age={child.age} />
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
