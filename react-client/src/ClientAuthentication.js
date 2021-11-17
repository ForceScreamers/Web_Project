export const AuthData = (userData) => {
  if (userData && userData.email == "yee@mail" && userData.password == "pass") {
    return true;
  }
  else {
    return false;
  }
}