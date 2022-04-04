import { Modal, Button } from "react-bootstrap"

import './ArticleModalStyles.css'


export default function ArticleModal({ ShowArticleModal, CloseArticleModal, Topic, Title, ProviderName, Content, ProviderData /*later*/ }) {
  return (
    <div className="article-modal-container">
      <Modal show={ShowArticleModal} >
        <Modal.Header>
          <Modal.Title>{Topic} - {Title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Content}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => CloseArticleModal()}>סגירה</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
