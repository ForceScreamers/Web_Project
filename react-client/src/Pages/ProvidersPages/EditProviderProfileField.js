import React from 'react'
import { InputField } from '../../Project-Modules/UserInputValidation'

const EDIT_PAGE_MODE = {
  EDIT: 0,
  DISPLAY: 1,
}

export default function EditProviderProfileField({ Value, Mode, UpdateStateField }) {
  console.log(UpdateStateField)
  return (
    <>
      {
        Mode === EDIT_PAGE_MODE.DISPLAY
          ?
          <label>{Value}</label>
          :
          <input name="EditProviderProfileField" type="text" defaultValue={Value} onChange={(e) => UpdateStateField(() => e.target.value)} />
      }
    </>
  )
}
