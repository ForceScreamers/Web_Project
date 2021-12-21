import MainPage from "../components/MainPage"

function About({ username }) {
  return (
    <div>
      <MainPage title='אודות' username={username}>
        <h2> אלו אודות</h2>
      </MainPage>
    </div>
  )
}

export default About
