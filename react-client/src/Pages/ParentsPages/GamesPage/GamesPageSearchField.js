import React from 'react'
import { CloseButton, FormSelect } from 'react-bootstrap'
import { useState } from 'react';
import { GAMES_PAGE_SEARCH_VALUE_ALL } from '../../../Constants';

export default function GamesPageSearchField({ UpdateSearchResult, GamesSearchValue }) {
  const [gameTopics, setGameTopics] = useState(() => GetAllTopicsFromGames())

  //  Gets the topics from games that match the topic
  //  If there's a topic that has no games, it won't be added to the list
  function GetAllTopicsFromGames() {
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

        <FormSelect className="info-page-select-field" onChange={UpdateSearchResult} value={GamesSearchValue}>
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
