import { Container, Row, Col } from "react-bootstrap"
import AddChildCard from "../components/ChildManagementComps/AddChildCard"
import ChildCard from "../components/ChildManagementComps/ChildCard"
import MainPage from "../components/MainPage"

import { useEffect, useState } from "react"



function EditProfile({ IsSelectedChild, HandleSelectChild, HandleDeleteChild, HandleAddChild, children_: childrenProfiles }) {

  return (
    <div>
      <MainPage title='עריכת פרופיל'>



        <h1>רשימת ילדים</h1>
        <Container fluid className="d-flex justify-content-around align-center">
          <Row>
            <Col>

              {
                //  i - index inside the state array, using it because react wants to use it...
                childrenProfiles.map((childProfile) => (
                  <ChildCard
                    IsSelectedChild={IsSelectedChild}
                    HandleSelectChild={HandleSelectChild}
                    HandleDeleteChild={HandleDeleteChild}
                    ChildProfile={childProfile}
                    key={childProfile.id}  // Key for the component's index
                  />
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
