import NavigationBar from "../components/NavigationBar"
import NavigationBarTest from "./NavigationBarTest"

function MainPage({ children, title, username }) {
  return (
    <div>
      <NavigationBar username={username} />
      <h1>{title}</h1>

      {children}{/* The components that go inside this wrapper component */}

    </div>
  )
}

export default MainPage
