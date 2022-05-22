import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { ProvidersApiRequest } from '../../RequestHeadersToWebApi';
import EditProviderProfileField from './EditProviderProfileField';
import utf8 from 'utf8'


const EDIT_PAGE_MODE = {
  EDIT: 0,
  DISPLAY: 1,
}

export default function EditProviderProfile() {
  const [editPageMode, setEditPageMode] = useState(EDIT_PAGE_MODE.DISPLAY)


  const [providerName, setProviderName] = useState("");
  const [providerOccupation, setProviderOccupation] = useState("");
  const [providerPhoneNumber, setProviderPhoneNumber] = useState("");
  const [providerEmail, setProviderEmail] = useState("");

  useEffect(() => {
    let providerInfo = JSON.parse(sessionStorage.getItem('Info'));
    setProviderName(providerInfo.FullName);
    setProviderOccupation(providerInfo.Occupation);
    setProviderPhoneNumber(providerInfo.PhoneNumber);
    setProviderEmail(providerInfo.Email);
  }, [])

  async function UpdateProviderProfile(e) {
    e.preventDefault();

    let providerId = JSON.parse(sessionStorage.getItem('Info')).Id;

    let newProfileValues = {
      providerId: providerId,
      providerName: utf8.encode(providerName),
      providerOccupation: utf8.encode(providerOccupation),
      providerPhoneNumber: utf8.encode(providerPhoneNumber),
      providerEmail: utf8.encode(providerEmail)
    }

    await ProvidersApiRequest('POST', 'UpdateProviderInfo', newProfileValues)

    UpdateStateValuesWithInfo(newProfileValues);
  }

  function UpdateStateValuesWithInfo(providerInfo) {
    setProviderName(utf8.decode(providerInfo.providerName));
    setProviderOccupation(utf8.decode(providerInfo.providerOccupation));
    setProviderPhoneNumber(utf8.decode(providerInfo.providerPhoneNumber));
    setProviderEmail(utf8.decode(providerInfo.providerEmail));
  }

  function FlipEditPageMode() { setEditPageMode(1 - editPageMode); }

  function IsPageInEditMode() { return editPageMode === EDIT_PAGE_MODE.EDIT }

  return (
    <form onSubmit={UpdateProviderProfile}>

      <Button hidden={IsPageInEditMode()} variant="danger" onClick={() => FlipEditPageMode()}>ערוך</Button>
      <Button hidden={!IsPageInEditMode()} onClick={FlipEditPageMode} type="submit">עדכון</Button>

      <div className='d-flex flex-column justify-content-center align-items-start '>
        <label>שם: <EditProviderProfileField UpdateStateField={setProviderName} Value={providerName} Mode={editPageMode} /></label>
        <label>תעסוקה: <EditProviderProfileField UpdateStateField={setProviderOccupation} Value={providerOccupation} Mode={editPageMode} /></label>
        <label>מספר טלפון: <EditProviderProfileField UpdateStateField={setProviderPhoneNumber} Value={providerPhoneNumber} Mode={editPageMode} /></label>
        <label>אי-מייל: <EditProviderProfileField UpdateStateField={setProviderEmail} Value={providerEmail} Mode={editPageMode} /></label>
      </div>

    </form>
  )
}
