import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function LogoutButton() {

  const history = useHistory();

  function LogoutUser() {
    sessionStorage.clear();
    history.replace("/");
  }

  return (
    <Button onClick={() => LogoutUser()} variant='danger' style={{ marginRight: "20px" }}>יציאה</Button>
  )
}
