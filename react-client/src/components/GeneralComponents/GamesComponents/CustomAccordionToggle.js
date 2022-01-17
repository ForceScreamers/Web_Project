import { Button } from "react-bootstrap";
//import { useAccordionButton } from "react-bootstrap";
import { useAccordionToggle } from "react-bootstrap";

export default function CustomToggle({ children, eventKey, ...props }) {
  const decoratedOnClick = useAccordionToggle(eventKey, () =>
    console.log('totally custom!'),
  );

  return (
    <Button {...props} onClick={decoratedOnClick}
    >
      {children}
    </Button>
  );
}