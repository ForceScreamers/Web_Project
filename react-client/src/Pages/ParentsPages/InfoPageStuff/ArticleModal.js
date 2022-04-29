import { Modal, Button } from "react-bootstrap"
import { ParentsApiRequest, ProvidersApiRequest } from "../../../RequestHeadersToWebApi"

import './ArticleModalStyles.css'


export default function ArticleModal({ ShowArticleModal, CloseArticleModal, Topic, TopicId, Title, ProviderName, Content, ProviderData /*later*/ }) {
  return (
    <div >
      <Modal show={ShowArticleModal} style={{ top: "5%" }} className="article-modal-container">
        <Modal.Header>
          <div>
            <Modal.Title>{Topic} - {Title}</Modal.Title>
          </div>
          <Button variant="link" size="lg">{ProviderName}</Button>
        </Modal.Header>
        <Modal.Body style={{ height: "70vh" }}>
          {Content}
        </Modal.Body>
        <Modal.Footer>
          <ShowGamesByTopicButton TopicId={2} />
          <Button variant="danger" onClick={() => CloseArticleModal()}>סגירה</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}



function ShowGamesByTopicButton({ TopicId }) {
  async function GetGamesByTopicIdFromApi(topicId) {

    let gameIds = await ParentsApiRequest("GET", "GetGameIdsByTopicId", { topicId: topicId });
    console.log(gameIds);
  }

  return (
    <Button onClick={() => GetGamesByTopicIdFromApi(TopicId)}>משחקים בנושא זה</Button>
  )
}
