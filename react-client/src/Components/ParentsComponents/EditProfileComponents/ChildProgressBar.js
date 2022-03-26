import { ProgressBar } from "react-bootstrap"
// import './ChildProgressBarStyles.css'


export default function ChildProgressBar({ Now }) {
  return (
    <ProgressBar now={Now} visuallyHidden label={"שדג"} animated variant="success" />
  )
}
