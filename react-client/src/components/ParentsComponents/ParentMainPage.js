import { Suspense } from "react"
import NavigationBar from "./ParentNavigationBar"

export default function ParentMainPage({ children, title }) {
  return (
    <div>
      <Suspense fallback={<h1>loading</h1>}>
        <NavigationBar />
      </Suspense>
      <h1>{title}</h1>

      {children}{/* The components that go inside this wrapper component */}

    </div>
  )
}