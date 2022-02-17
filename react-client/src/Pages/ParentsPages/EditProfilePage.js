import { Container, Row, Col } from "react-bootstrap"
import AddChildCard from "../../Components/ParentsComponents/EditProfileComponents/AddChildCard"
import ChildCard from "../../Components/ParentsComponents/EditProfileComponents/ChildCard"
import ParentMainPage from "../../Components/ParentsComponents/ParentMainPage"

import { useEffect, useState } from "react"
import utf8 from 'utf8'
import { ParentsApiRequest } from "../../RequestHeadersToWebApi"

export default function EditProfilePage({ LoadChildrenFromServer }) {

  const [childrenProfiles, setChildrenProfiles] = useState(JSON.parse(sessionStorage.getItem('children')))

  useEffect(() => {

    console.log(childrenProfiles)
    setChildrenProfiles(JSON.parse(sessionStorage.getItem('children')));

  }, [])


  async function HandleAddChild(e, formValid) {
    e.preventDefault();

    if (formValid) {

      let childData = {
        childAge: e.target.childAgeSelect.value,
        parentId: JSON.parse(sessionStorage.getItem('userId')),
        childName: utf8.encode(e.target.childNameField.value),
      }

      let response = await ParentsApiRequest('POST', 'AddChild', childData).catch(err => console.log(err));
      console.log(response);

      //	Response will be HasAddedChild
      if (response) {
        LoadChildrenFromServer(e);
      }
      else { console.log("No response from server") }
    }
  }


  async function SelectChild(e, childIdToSelect) {
    let childSelectData = {
      childId: childIdToSelect,
      parentId: JSON.parse(sessionStorage.getItem('userId')),
    }

    ParentsApiRequest('POST', 'SelectChild', childSelectData).catch(err => console.log(err))
      .then(() => {
        LoadChildrenFromServer();
      })
  }

  function DeleteChild(childId) {
    let parentId = JSON.parse(sessionStorage.getItem('userId'));

    let requestData = {
      childId: childId,
      parentId: parentId,
    }

    ParentsApiRequest('POST', 'DeleteChild', requestData)
      .then(() => {
        LoadChildrenFromServer();
      })
  }


  return (
    <div >
      <ParentMainPage title='עריכת פרופיל'>
        <h1>רשימת ילדים</h1>
        <Container fluid className="d-flex justify-content-around align-center">
          <Row>
            <Col>
              {

                childrenProfiles !== null//  If there are no children

                  //  i - index inside the state array, using it because react wants to use it...
                  ? childrenProfiles.map((childProfile) => (
                    <ChildCard
                      SelectChild={SelectChild}
                      DeleteChild={DeleteChild}
                      ChildProfile={childProfile}
                      key={childProfile.Id}  // Key for the component's index

                    />
                  ))
                  : <></>

              }
              <AddChildCard HandleAddChild={HandleAddChild} />

            </Col>
          </Row>


        </Container>
      </ParentMainPage>
    </div>
  )
}