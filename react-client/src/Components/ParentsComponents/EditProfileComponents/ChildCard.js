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

export default function ChildCard({ SelectChild, DeleteChild, ChildProfile, LoadChildrenFromServer }) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [childProfile, setChildProfile] = useState(ChildProfile)

  function HandleDeleteChild() {
    console.log(ChildProfile)
    setShowDeleteConfirmation(true);
  }

  function HandleDeleteConfirmation() {
    setShowDeleteConfirmation(false);
    console.log(ChildProfile.Name)
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


  return (
    <div>
      <Card className="child-profile-card game-card">

        <CloseButton onClick={HandleDeleteChild} />


        <div className="edit-profile-secondary-card-container">
          <div className="child-profile-icon-container">
            <img alt="child-profile" src={GetChildProfileIcon()} />
          </div>

          <button
            onClick={(e) => SelectChild(e, ChildProfile.Id)}
            className="child-profile-select-button"
            style={{ backgroundColor: GetButtonBackroundColor() }}
          >{childProfile.Name}</button>
        </div>
      </Card >



      <ChildDeleteConfirmationModal
        ShowDeleteConfirmation={showDeleteConfirmation}
        HandleDeleteConfirmation={HandleDeleteConfirmation}
        CloseDeleteConfirmation={CloseDeleteConfirmation}
      />
    </div>
  )
}