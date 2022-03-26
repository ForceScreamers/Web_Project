import { Card, CloseButton, Button } from 'react-bootstrap'
import ChildEvaluationsDisplay from './ChildEvaluationsDisplay'
import { useState } from 'react';
import ChildDeleteConfirmationModal from './ChildDeleteConfirmationModal';

function ChildCard({ SelectChild, DeleteChild, ChildProfile }) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  function HandleDeleteChild() {
    setShowDeleteConfirmation(true);
  }

  function HandleDeleteConfirmation() {
    setShowDeleteConfirmation(false);
    DeleteChild(ChildProfile.Id);
  }

  function CloseDeleteConfirmation() {
    setShowDeleteConfirmation(false);
  }

  return (
    <div>
      <Card
        bg={"light"}
        key={1}
        border={"dark"}
        text={"dark" /*Can be light or dark*/}
        style={{ width: '30rem' }}
        className="mb-3"
      >

        <Card.Body >
          <Card.Title>
            <CloseButton aria-label='מחיקה' onClick={() => HandleDeleteChild()} /> {ChildProfile.Name + " "}

            <Button
              className='test-class'
              // disabled={isSelected ? "true" : "false"}
              disabled={ChildProfile.IsSelected}
              onClick={(e) => SelectChild(e, ChildProfile.Id)} variant="primary"
            >
              {ChildProfile.IsSelected ? "ילד נוכחי" : "בחר ילד"}


            </Button>

          </Card.Title>
          <Card.Text>
            {"גיל: " + ChildProfile.Age}
          </Card.Text>

          <ChildEvaluationsDisplay Evaluations={ChildProfile.Evaluations} />
        </Card.Body>

        <ChildDeleteConfirmationModal
          ShowDeleteConfirmation={showDeleteConfirmation}
          HandleDeleteConfirmation={HandleDeleteConfirmation}
          CloseDeleteConfirmation={CloseDeleteConfirmation}
        />

      </Card>
    </div >
  )
}

export default ChildCard
