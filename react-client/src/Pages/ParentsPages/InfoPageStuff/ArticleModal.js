import { Modal, Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { ParentsApiRequest, ProvidersApiRequest } from "../../../RequestHeadersToWebApi"

import './ArticleModalStyles.css'


export default function ArticleModal({ SetGamesSearchValue, ShowArticleModal, CloseArticleModal, TopicTitle, TopicId, Title, ProviderName, Content, ProviderData /*later*/ }) {
  return (
    <div>
      <Modal show={ShowArticleModal} className="article-modal-main" centered dialogClassName="modal-dialog">

        <Modal.Body className="article-modal-body">

          <div className="article-modal-content-top">
            <Modal.Title>{Title}</Modal.Title>

            {Content}
            <div className="article-modal-content-body">
            </div>
          </div>



          <div className="article-modal-content-bottom">
            <label>
              כותב המאמר:
              <Button variant="link" size="lg">{ProviderName}</Button>
            </label>
          </div>

        </Modal.Body>
        <Modal.Footer className="article-modal-footer">
          <div>
            <label>תחום: {TopicTitle}</label>
          </div>


          <div>
            <ShowGamesByTopicButton SetGamesSearchValue={SetGamesSearchValue} TopicTitle={TopicTitle} />
            <Button variant="danger" onClick={() => CloseArticleModal()}>סגירה</Button>
          </div>

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
    <Button onClick={() => Yee(TopicTitle)}>למשחקים בתחום</Button>
  )
}
