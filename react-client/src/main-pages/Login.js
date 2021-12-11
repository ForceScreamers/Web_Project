//TODO: Add verify inputs as a function to import (a function that is not in this file)
import '../css/pages-css/Login.css';

import { Link } from 'react-router-dom';

function Login({ HandleLogin }) {

    return (
        <div className="LoginContainer">

            <h1>Login</h1>
            <Link to="/Register" >הרשמה</Link>

            <form onSubmit={HandleLogin}>

                <div className="InputContainer">
                    <label>אי-מייל:</label>
                    <input name="loginEmailField" type="text" />

                    <label>סיסמה:</label>
                    <input name="loginPasswordField" type="password" />

                    <input type="submit" value="התחברות" />
                </div>
            </form>


        </div>
    )
}

export default Login
