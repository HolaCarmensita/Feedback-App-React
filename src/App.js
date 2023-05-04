//main app component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './component/Header'
import FeedbackList from './component/FeedbackList'
import FeedbackStats from './component/FeebackStats'
import FeedbackForm from './component/FeedbackForm'
import AboutIconLink from './component/AboutIconLink'
import AboutPage from './pages/AboutPage'
import { FeedbackProvider } from './component/context/feedbackContext'

function App() {
  return (
    <FeedbackProvider>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <FeedbackForm />
                  <FeedbackStats />
                  <FeedbackList />
                </>
              }
            ></Route>

            <Route path="/about" element={<AboutPage />} />
          </Routes>
          <AboutIconLink />
        </div>
      </Router>
    </FeedbackProvider>
  )
}

export default App
