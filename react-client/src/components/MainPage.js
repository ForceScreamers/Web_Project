import NavigationBar from "../components/NavigationBar"
import NavigationBarTest from "./NavigationBarTest"

function MainPage({ children, title }) {
  return (
    <div>
      <NavigationBar />
      <h1>{title}</h1>

      {children}{/* The components that go inside this wrapper component */}

    </div>
  )
}

export default MainPage
