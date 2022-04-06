import { Modal, Button } from "react-bootstrap"

import './ArticleModalStyles.css'


export default function ArticleModal({ ShowArticleModal, CloseArticleModal, Topic, Title, ProviderName, Content, ProviderData /*later*/ }) {
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
          <Button variant="danger" onClick={() => CloseArticleModal()}>סגירה</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
