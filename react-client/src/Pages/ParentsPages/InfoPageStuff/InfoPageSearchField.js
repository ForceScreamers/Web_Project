import React from 'react'
import { CloseButton, FormSelect } from 'react-bootstrap'

export default function InfoPageSearchField({ UpdateFilterType, UpdateFilterValue, FilterValue, FilterType, ClearSearch }) {

  return (
    <div className='d-flex flex-column align-items-center'>
      <h2>חיפוש</h2>
      <div className="info-page-search-container" >
        <div className="d-flex align-items-center" onClick={ClearSearch}><CloseButton className='btn-lg' /></div>
        <input className="info-page-search-field" type="text" size={20} placeholder="ערך" onChange={UpdateFilterValue} value={FilterValue} />

        <FormSelect className="info-page-select-field" onChange={UpdateFilterType} value={FilterType}>
          <option value="all" hidden>חיפוש לפי...</option>
          <option value="article.topic_name">נושא</option>
          <option value="provider.provider_full_name">שם המחבר</option>
          <option value="article.article_title">שם המאמר</option>
        </FormSelect>
      </div>
    </div>
  )
}
