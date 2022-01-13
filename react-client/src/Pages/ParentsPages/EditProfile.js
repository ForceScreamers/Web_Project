import { Container, Row, Col } from "react-bootstrap"
import AddChildCard from "../../Components/ParentsComponents/EditProfileComponents/AddChildCard"
import ChildCard from "../../Components/ParentsComponents/EditProfileComponents/ChildCard"
import ParentMainPage from "../../Components/ParentsComponents/ParentMainPage"

import { useEffect, useState } from "react"



export default function EditProfile({ HandleSelectChild, HandleDeleteChild, HandleAddChild }) {

  const [childrenProfiles, setChildrenProfiles] = useState(JSON.parse(sessionStorage.getItem('children')))


  useEffect(() => {
    console.log(childrenProfiles)
    setChildrenProfiles(JSON.parse(sessionStorage.getItem('children')));
  }, [])

  return (
    <div>
      <ParentMainPage title='עריכת פרופיל'>
        <h1>רשימת ילדים</h1>
        <Container fluid className="d-flex justify-content-around align-center">
          <Row>
            <Col>

              {

                childrenProfiles != undefined//  If there are no children

                  //  i - index inside the state array, using it because react wants to use it...
                  ? childrenProfiles.map((childProfile) => (
                    <ChildCard
                      HandleSelectChild={HandleSelectChild}
                      HandleDeleteChild={HandleDeleteChild}
                      ChildProfile={childProfile}
                      key={childProfile.id}  // Key for the component's index
                    />
                  ))
                  : <></>

              }
              <AddChildCard HandleAddChild={HandleAddChild} />

            </Col>
          </Row>

          <Row></Row>
          <Row></Row>


        </Container>
      </ParentMainPage>
    </div>
  )
}