import { Modal, Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { ParentsApiRequest, ProvidersApiRequest } from "../../../RequestHeadersToWebApi"

import './ArticleModalStyles.css'


export default function ArticleModal({ SetGamesSearchValue, ShowArticleModal, CloseArticleModal, TopicTitle, TopicId, Title, ProviderName, Content, ProviderData /*later*/ }) {
  return (
    <div >
      <Modal show={ShowArticleModal} style={{ top: "5%" }} className="article-modal-container">
        <Modal.Header>
          <div>
            <Modal.Title>{TopicTitle} - {Title}</Modal.Title>
          </div>
          <Button variant="link" size="lg">{ProviderName}</Button>
        </Modal.Header>
        <Modal.Body style={{ height: "70vh" }}>
          {Content}
        </Modal.Body>
        <Modal.Footer>
          <ShowGamesByTopicButton SetGamesSearchValue={SetGamesSearchValue} TopicTitle={TopicTitle} />
          <Button variant="danger" onClick={() => CloseArticleModal()}>סגירה</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}



function ShowGamesByTopicButton({ TopicTitle, SetGamesSearchValue }) {
  const history = useHistory();

  function Yee(topicTitle) {
    history.push('/Parent/Games');
    sessionStorage.setItem('gamesSearchValue', topicTitle);

    SetGamesSearchValue(topicTitle);
  }

  return (
    <Button onClick={() => Yee(TopicTitle)}>משחקים בנושא זה</Button>
  )
}
