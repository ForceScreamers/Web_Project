import React from 'react'
import { CloseButton, FormSelect } from 'react-bootstrap'
import { useState } from 'react';
import { GAMES_PAGE_SEARCH_VALUE_ALL } from '../../../Constants';

export default function GamesPageSearchField({ UpdateSearchResult }) {
  const [gameTopics, setGameTopics] = useState(() => GetAllTopicsFromGames())

  function GetAllTopicsFromGames() {
    //  Get games
    let games = JSON.parse(sessionStorage.getItem('games'));
    let topics = [];

    for (let game of games) {
      for (let gameTopic of game.Topics) {
        if (topics.includes(gameTopic) === false)
          topics.push(gameTopic);
      }
    }

    return topics
  }

  return (
    <div className='d-flex flex-column align-items-center'>
      <h2>הצג משחקים בתחום:</h2>
      <div className="info-page-search-container" >

        <FormSelect className="info-page-select-field" onChange={UpdateSearchResult}>
          <option>{GAMES_PAGE_SEARCH_VALUE_ALL}</option>
          {
            gameTopics.map((gameTopic, index) => {
              return (
                <option value={gameTopic} key={index}>{gameTopic}</option>
              )
            })
          }

        </FormSelect>
      </div>
    </div>
  )
}
