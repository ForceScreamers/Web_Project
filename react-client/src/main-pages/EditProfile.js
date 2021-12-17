import { Container, Row, Col } from "react-bootstrap"
import AddChildCard from "../components/ChildManagementComps/AddChildCard"
import ChildCard from "../components/ChildManagementComps/ChildCard"
import MainPage from "../components/MainPage"

import { useEffect, useState } from "react"


function EditProfile({ HandleAddChild, children_: childrenProfiles }) {
  //const [childrenProfiles, setChildrenProfiles] = useState([])

  useEffect(() => {
    toArray();

  }, [])
  const toArray = () => {
    childrenProfiles = [...childrenProfiles]

  }
  return (
    <div>
      <MainPage title='עריכת פרופיל'>
        <h1>רשימת ילדים</h1>
        <Container fluid className="d-flex justify-content-around align-center">
          <Row>
            <Col>

              {

                childrenProfiles.map((index, name, age) => (
                  <ChildCard key={index} name={name} age={age} />
                ))

              }

              <ChildCard name="a" age="2" />
              <ChildCard name="b" age="5" />
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
