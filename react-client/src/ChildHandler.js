import axios from "axios"

export class ChildHandler {
  static async SelectChild(e, childToSelect) {
    e.preventDefault();

    console.log(childToSelect)
    axios({
      method: 'post',
      url: "http://localhost:5000/api/Parent/SelectChild",
      timeout: process.env.REACT_APP_REQUEST_TIMEOUT_LENGTH,
      headers: {
        'childId': JSON.stringify(childToSelect.Id),
        'parentId': sessionStorage.getItem('userId'),
      }
    })
  }



}
