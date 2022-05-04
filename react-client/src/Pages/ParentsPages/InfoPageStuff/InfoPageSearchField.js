import React from 'react'
import { Button, CloseButton, FormSelect } from 'react-bootstrap'
import { useState } from 'react'


export default function InfoPageSearchField({ UpdateArticles, UpdateFilterType, UpdateFilterValue, FilterValue, FilterType, ClearSearch }) {
  const [showTopicSelect, setShowTopicsSelect] = useState(false);

  const topics = JSON.parse(sessionStorage.getItem('topics'));

  function OnSelectFormChange(e) {
    UpdateFilterType(e);
    if (e.target.value === "article.topic_id") {
      ShowTopicsSelect();
    }
    else {
      HideTopicsSelect();
    }
  }

  function HideTopicsSelectAndClearSearch() {
    HideTopicsSelect();
    ClearSearch();
  }

  function ShowTopicsSelect() { setShowTopicsSelect(true); }
  function HideTopicsSelect() { setShowTopicsSelect(false); }


  return (
    <div className='d-flex flex-column align-items-center'>
      <h2>חיפוש</h2>
      <div className="info-page-search-container" >
        <div className="d-flex align-items-center" onClick={HideTopicsSelectAndClearSearch}><CloseButton className='btn-lg' /></div>

        <FormSearchTypeSelect
          OnSelectFormChange={OnSelectFormChange}
          FilterType={FilterType}
        />

        {
          showTopicSelect === true
            ?
            <FormTopicSelect
              UpdateFilterValue={UpdateFilterValue}
              Topics={topics}
            />
            :
            <input className="info-page-search-field" type="text" size={20} placeholder="ערך" onChange={UpdateFilterValue} value={FilterValue} />
        }

        <Button onClick={UpdateArticles}>חיפוש</Button>
      </div>
    </div>
  )
}


function FormSearchTypeSelect({ OnSelectFormChange, FilterType }) {
  return (
    <FormSelect className="info-page-select-field" onChange={OnSelectFormChange} value={FilterType}>
      <option value="all" hidden>חיפוש לפי...</option>
      <option value="article.topic_id">נושא</option>
      <option value="provider.provider_full_name">שם המחבר</option>
      <option value="article.article_title">שם המאמר</option>
    </FormSelect>
  )
}

function FormTopicSelect({ UpdateFilterValue, Topics }) {
  return (
    <FormSelect className="info-page-select-field" onChange={UpdateFilterValue}>
      <option value="all" hidden>שם נושא</option>

      {
        // Map every topic
        Topics.map((topic, index) => {
          return (
            <option value={topic.topic_id} key={index}>{topic.topic_title}</option>
          )
        })
      }
    </FormSelect>
  )
}
