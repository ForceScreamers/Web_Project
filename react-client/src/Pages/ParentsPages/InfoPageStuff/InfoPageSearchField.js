import React from 'react'
import { Button, FormSelect } from 'react-bootstrap'

export default function InfoPageSearchField({ UpdateFilterType, UpdateFilterValue, GetArticlesFromServer, FilterValue, FilterType }) {
  return (
    <div>
      <div className="info-page-search-container" >

        <input className="info-page-search-field" type="text" size={20} placeholder="ערך" onChange={UpdateFilterValue} />

        <FormSelect className="info-page-select-field" onChange={UpdateFilterType}>
          <option value="all" hidden>חיפוש לפי...</option>
          <option value="article.topic_name">נושא</option>
          <option value="provider.provider_full_name">שם המחבר</option>
          <option value="article.article_title">שם המאמר</option>
        </FormSelect>

        <Button className="info-page-search-button" onClick={() => GetArticlesFromServer()} disabled={FilterValue === "" || FilterType === "all"} >חיפוש</Button>
      </div>
    </div>
  )
}
