import React from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import './ParentsNoChildrenMessageStyles.css'

export default function NoChildrenMessage() {
  const history = useHistory();

  return (
    <div className='d-flex justify-content-center flex-column align-items-center mt-5'>
      <div className="no-children-message-container">
        <h1>אין גישה בלי ילדים במשתמש</h1>
      </div>
      <br />
      <Button className="no-children-message-button" onClick={() => history.push("/Parent/EditProfile")}>להוספת ילד</Button>
    </div>
  )
}
