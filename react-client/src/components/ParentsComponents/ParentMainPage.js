import NavigationBar from "./ParentNavigationBar"

export default function ParentMainPage({ children, title }) {
  return (
    <div>
      <NavigationBar />
      <h1>{title}</h1>

      {children}{/* The components that go inside this wrapper component */}

    </div>
  )
}