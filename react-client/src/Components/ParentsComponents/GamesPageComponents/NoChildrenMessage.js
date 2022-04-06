import React from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

export default function NoChildrenMessage() {
  const history = useHistory();

  return (
    <div className='d-flex justify-content-center flex-column align-items-center mt-5'>
      <h1>אין גישה בלי ילדים במשתמש</h1>
      <br />
      <Button onClick={() => history.push("/Parent/EditProfile")}>להוספת ילד</Button>
    </div>
  )
}
