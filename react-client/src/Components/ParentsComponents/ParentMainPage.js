import NavigationBar from "./ParentNavigationBar"


export default function ParentMainPage({ children, title }) {
  return (
    <div className="parent-background-image">
      <NavigationBar />
      <h1>{title}</h1>

      {children}{/* The components that go inside this wrapper component */}

    </div>
  )
}