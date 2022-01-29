import axios from "axios"

export class ChildHandler {
  static async RequestSelectChild(e, childToSelect) {
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

  static async RequestAddChild(parentId, childName, childAge) {
    return axios({
      method: 'post',
      url: "http://localhost:5000/api/Parent/AddChild",
      timeout: process.env.REACT_APP_REQUEST_TIMEOUT_LENGTH,
      headers: {
        'parentId': parentId,
        'childName': childName,
        'childAge': childAge
      }
    })
  }

  static async GetChildrenFromServer() {
    return axios({
      method: 'POST',
      url: "http://localhost:5000/api/Parent/GetChildren",
      timeout: process.env.REACT_APP_REQUEST_TIMEOUT_LENGTH,
      headers: {
        'parentId': sessionStorage.getItem('userId'),
      }
    })
      .catch(err => console.log(err))
      .then(response => { return response.data })
  }

  static async



}
