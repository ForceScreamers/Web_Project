import NavigationBar from "../components/NavigationBar"

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
