import { useHistory } from "react-router-dom";
import { useEffect } from "react";

export default function RouteDoesntExist() {
  const history = useHistory();

  useEffect(() => {
    console.log(history.location.pathname)
    history.listen(() => {
      console.log("I hate react!")
    })
  }, [])

  return <div>

  </div>;
}
