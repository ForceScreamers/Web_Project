import ProviderNavigationBar from "./Components/ProvidersComponents/ProviderNavigationBar"

export default function ProviderMainPage({ children, title }) {
  return (
    <div className="provider-background-image">
      <ProviderNavigationBar />
      <h1>{title}</h1>

      {children}{/* The components that go inside this wrapper component */}

    </div>
  )
}