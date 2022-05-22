import { Container, Row, Col } from "react-bootstrap"
import AddChildButton from "../../Components/ParentsComponents/EditProfileComponents/AddChildButton"
import ChildCard from "../../Components/ParentsComponents/EditProfileComponents/ChildCard"
import ParentMainPage from "../../Components/ParentsComponents/ParentMainPage"

import { useEffect, useState } from "react"
import utf8 from 'utf8'
import { ParentsApiRequest } from "../../RequestHeadersToWebApi"

import Masonry from 'react-masonry-css'
import AddChildProfileModal from "../../Components/ParentsComponents/EditProfileComponents/AddChildProfileModal"



const breakpointColumnsObj = {
  default: 4,
  1900: 3,
  1500: 2,
  1000: 1
};


//TODO: Finish add child and edit child 


export default function EditProfilePage({ LoadChildrenFromServer }) {

  const [childrenProfiles, setChildrenProfiles] = useState(JSON.parse(sessionStorage.getItem('children')))

  const [showAddChildProfileModal, setShowAddChildProfileModal] = useState(false);
  const [showEditChildProfileModal, setShowEditChildProfileModal] = useState(false);

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

  function DisplayAddChildProfileModal() { setShowAddChildProfileModal(true); }
  function CloseAddChildProfileModal() { setShowAddChildProfileModal(false); }

  function DisplayEditChildProfileModal() { setShowEditChildProfileModal(true); }
  function CloseEditChildProfileModal() { setShowEditChildProfileModal(false); }


  return (
    <div >
      <ParentMainPage>
        <div className="d-flex justify-content-center">
          <Masonry className="children-profiles-container" breakpointCols={breakpointColumnsObj}>
            {
              childrenProfiles !== null//  If there are no children
                //  i - index inside the state array, using it because react wants to use it...
                ? childrenProfiles.map((childProfile, index) => (
                  <ChildCard
                    HandleAddChild={HandleAddChild}

                    DisplayEditChildProfileModal={DisplayEditChildProfileModal}
                    ShowEditChildProfileModal={showEditChildProfileModal}
                    CloseEditChildProfileModal={CloseEditChildProfileModal}

                    SelectChild={SelectChild}
                    DeleteChild={DeleteChild}
                    ChildProfile={childProfile}
                    key={index}  // Key for the component's index
                  />
                ))
                : <></>
            }

            <div>
              <AddChildButton DisplayAddChildProfileModal={DisplayAddChildProfileModal} />
            </div>
          </Masonry>
        </div>

        <AddChildProfileModal HandleAddChild={HandleAddChild} ShowAddChildProfileModal={showAddChildProfileModal} CloseAddChildProfileModal={CloseAddChildProfileModal} />
      </ParentMainPage>
    </div>
  )
}