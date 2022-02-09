import { Container, Row, Col } from "react-bootstrap"
import AddChildCard from "../../Components/ParentsComponents/EditProfileComponents/AddChildCard"
import ChildCard from "../../Components/ParentsComponents/EditProfileComponents/ChildCard"
import ParentMainPage from "../../Components/ParentsComponents/ParentMainPage"

import { useEffect, useState } from "react"
import { ChildrenHandlerApi } from "../../ChildrenHandlerApi"
import utf8 from 'utf8'

export default function EditProfilePage({ LoadChildrenFromServer }) {

  const [childrenProfiles, setChildrenProfiles] = useState(JSON.parse(sessionStorage.getItem('children')))

  useEffect(() => {

    console.log(childrenProfiles)
    setChildrenProfiles(JSON.parse(sessionStorage.getItem('children')));

  }, [])


  //  Handles child add logic
  function HandleAddChild(e, formValid) {
    e.preventDefault();

    console.log(`Add child? ${formValid}`)

    if (formValid) {

      let childAge = e.target.childAgeSelect.value;
      let parentId = JSON.parse(sessionStorage.getItem('userId'));
      let childName = utf8.encode(e.target.childNameField.value);

      //Send request to server to add child
      ChildrenHandlerApi.AddChild(parentId, childName, childAge)

        .then((response) => {//	Get confirmation that the child was added
          console.log(response);
          //	Response will be HasAddedChild
          if (response) {
            LoadChildrenFromServer(e);
          }
          else { console.log("No response from server") }
        })
    }
  }

  /**
   * Changes the selected child from edit profile to the current child
   * Used to keep track of progress for this child
   */
  function HandleSelectChild(e, childToSelect) {

    ChildrenHandlerApi.SelectChild(e, childToSelect)
      .catch(err => console.log(err))
      .then(() => {

        LoadChildrenFromServer();
      })
  }

  function DeleteChild(childId) {

    let parentId = JSON.parse(sessionStorage.getItem('userId'));

    ChildrenHandlerApi.DeleteChild(childId, parentId)
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

                childrenProfiles !== undefined//  If there are no children

                  //  i - index inside the state array, using it because react wants to use it...
                  ? childrenProfiles.map((childProfile) => (
                    <ChildCard
                      HandleSelectChild={HandleSelectChild}
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