import '../css/pages-css/Register.css'
import { Link } from "react-router-dom"
function Register({ HandleRegister }) {
  return (
    <div>

      <div className="RegisterContainer">
        <h1>Register</h1>
        <Link to="/" >login</Link>

        <form onSubmit={HandleRegister}>
          <div className="InputContainer">

            <label>Username:</label>
            <input name="registerUsernameField" type="text" />

            <label>Email:</label>
            <input name="registerEmailField" type="text" />

            <label>Password:</label>
            <input name="registerPasswordField" type="password" />

            <label>Profile Picture:</label>
            <label>Choose or Upload</label>

            <input type="submit" value="Register" />
          </div>
        </form>

      </div>
    </div >
  )
}

export default Register
