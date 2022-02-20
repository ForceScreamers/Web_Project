import { Button } from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap/AccordionButton";

export default function CustomToggle({ children, eventKey, ...props }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log('totally custom!'),
  );

  return (
    <Button {...props} onClick={decoratedOnClick}
    >
      {children}
    </Button>
  );
}