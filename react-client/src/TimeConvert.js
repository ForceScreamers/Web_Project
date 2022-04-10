export default function ConvertSecondsToTime(timeInSeconds) {
  let date = new Date(0);
  date.setSeconds(timeInSeconds);
  let timeString = date.toISOString().substring(14, 19)
  return timeString;
}