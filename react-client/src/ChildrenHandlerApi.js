import axios from "axios"

export class ChildrenHandlerApi {
  static async SelectChild(e, childToSelect) {
    e.preventDefault();

    console.log(childToSelect)
    axios({
      method: 'GET',
      url: `http://${process.env.REACT_APP_DOMAIN_NAME}/api/Parent/SelectChild`,
      timeout: process.env.REACT_APP_REQUEST_TIMEOUT_LENGTH,
      headers: {
        'childId': JSON.stringify(childToSelect.Id),
        'parentId': sessionStorage.getItem('userId'),
      }
    })
      .catch(err => console.log(err))
  }


  static async GetChildren(parentId) {
    return axios({
      method: 'POST',
      url: `http://${process.env.REACT_APP_DOMAIN_NAME}/api/Parent/GetChildren`,
      timeout: process.env.REACT_APP_REQUEST_TIMEOUT_LENGTH,
      headers: {
        'parentId': parentId,
      }
    })
      .catch(err => console.log(err))
  }

  static async AddChild(userId, childToAddName, childToAddAge) {
    return axios({
      method: 'post',
      url: `http://${process.env.REACT_APP_DOMAIN_NAME}/api/Parent/AddChild`,
      timeout: process.env.REACT_APP_REQUEST_TIMEOUT_LENGTH,
      headers: {
        'parentId': userId,
        'childName': childToAddName,
        'childAge': childToAddAge,
      }
    })
      .catch(err => console.log(err))
  }

  static async DeleteChild(childId, parentId) {
    axios({
      method: 'POST',
      url: `http://${process.env.REACT_APP_DOMAIN_NAME}/api/Parent/DeleteChild`,
      timeout: process.env.REACT_APP_REQUEST_TIMEOUT_LENGTH,
      headers: {
        'childId': childId,
        'parentId': parentId,
      }
    })
      .catch(err => console.log(err))
  }
}
