import React from 'react'
import { CloseButton, FormSelect } from 'react-bootstrap'

import { GAMES_PAGE_FILTER_TYPE } from '../../../Constants'

export default function GamesPageSearchField({ UpdateFilterType, UpdateFilterValue, FilterValue, FilterType, ClearSearch }) {

  return (
    <div className='d-flex flex-column align-items-center'>
      <h2>חיפוש</h2>
      <div className="info-page-search-container" >
        <div className="d-flex align-items-center" onClick={ClearSearch}><CloseButton className='btn-lg' /></div>

        {/* TODO: Get game types from db and show dropdown list intead of text field */}
        <input className="info-page-search-field" type="text" size={20} placeholder="ערך" onChange={UpdateFilterValue} value={FilterValue} />

        <FormSelect className="info-page-select-field" onChange={UpdateFilterType} value={FilterType}>
          <option value={GAMES_PAGE_FILTER_TYPE.ALL} hidden>חיפוש לפי...</option>
          <option value={GAMES_PAGE_FILTER_TYPE.GAME_TYPE} hidden>סוג המשחק</option>
          <option value={GAMES_PAGE_FILTER_TYPE.GAME_NAME} hidden>שם המשחק</option>

        </FormSelect>
      </div>
    </div>
  )
}
