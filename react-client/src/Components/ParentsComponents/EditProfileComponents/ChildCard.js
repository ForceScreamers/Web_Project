import { Card, CloseButton, Button } from 'react-bootstrap'
import { useState } from 'react';
import ChildDeleteConfirmationModal from './ChildDeleteConfirmationModal';

import './EditProfileStyles.css'

import editChildProfileIconUnselected from '../../../website-images/child-profile-edit-icon-unselected.png'
import editChildProfileIconSelected from '../../../website-images/child-profile-edit-icon-selected.png'
import childProfileIconUnselected from '../../../website-images/child-profile-icon-unselected.png'
import childProfileIconSelected from '../../../website-images/child-profile-icon-selected.png'
import EditChildProfileModal from './EditChildProfileModal';
import { ParentsApiRequest } from '../../../RequestHeadersToWebApi';

const SELECTED_PROFILE_COLOR = "#A7D9FC";
const UNSELECTED_PROFILE_COLOR = "#F9B2F6";

export default function ChildCard(
  {
    HandleAddChild,
    DisplayEditChildProfileModal,
    ShowEditChildProfileModal,
    CloseEditChildProfileModal,
    SelectChild, DeleteChild,
    ChildProfile,
    LoadChildrenFromServer
  }
) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);


  function HandleDeleteChild() {
    console.log(ChildProfile)
    setShowDeleteConfirmation(true);
  }

  function HandleDeleteConfirmation() {
    setShowDeleteConfirmation(false);
    DeleteChild(ChildProfile.Id);
  }

  function CloseDeleteConfirmation() {
    setShowDeleteConfirmation(false);
  }


  //  Selected and unselected images and background
  function GetButtonBackroundColor() {
    return ChildProfile.IsSelected ? SELECTED_PROFILE_COLOR : UNSELECTED_PROFILE_COLOR
  }

  function GetChildProfileIcon() {
    return ChildProfile.IsSelected ? childProfileIconSelected : childProfileIconUnselected
  }

  function GetChildProfileEditIcon() {
    return ChildProfile.IsSelected ? editChildProfileIconSelected : editChildProfileIconUnselected;
  }



  return (
    <div>
      <Card className="child-profile-card">


        <div className="child-profile-edit-icon-container">
          <img onClick={() => DisplayEditChildProfileModal()} alt="edit-profile" src={GetChildProfileEditIcon()} width={100} />
        </div>




        <div className="edit-profile-secondary-card-container">
          <div className="child-profile-icon-container">
            <img alt="child-profile" src={GetChildProfileIcon()} />
          </div>

          <button
            onClick={(e) => SelectChild(e, ChildProfile.Id)}
            className="child-profile-select-button"
            style={{ backgroundColor: GetButtonBackroundColor() }}
          >{ChildProfile.Name}</button>
        </div>
      </Card >

      <EditChildProfileModal
        HandleDeleteChild={HandleDeleteChild}
        HandleEditChild={HandleAddChild}
        ShowEditChildProfileModal={ShowEditChildProfileModal}
        CloseEditChildProfileModal={CloseEditChildProfileModal}

        ChildProfile={ChildProfile}
        LoadChildrenFromServer={LoadChildrenFromServer}
      />


      <ChildDeleteConfirmationModal
        ShowDeleteConfirmation={showDeleteConfirmation}
        HandleDeleteConfirmation={HandleDeleteConfirmation}
        CloseDeleteConfirmation={CloseDeleteConfirmation}
      />
    </div>
  )
}


// <Card.Body >
//           <Card.Title>
//             <CloseButton aria-label='מחיקה' onClick={() => HandleDeleteChild()} /> {ChildProfile.Name + " "}

//             <Button
//               className='test-class'
//               // disabled={isSelected ? "true" : "false"}
//               disabled={ChildProfile.IsSelected}
//               onClick={(e) => SelectChild(e, ChildProfile.Id)} variant="primary"
//             >
//               {ChildProfile.IsSelected ? "ילד נוכחי" : "בחר ילד"}


//             </Button>

//           </Card.Title>
//           <Card.Text>
//             {"גיל: " + ChildProfile.Age}
//           </Card.Text>

//         </Card.Body>