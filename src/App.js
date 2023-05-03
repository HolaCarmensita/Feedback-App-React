//main app component
import { v4 as uuidv4 } from 'uuid'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import Header from './component/Header'
import FeedbackList from './component/FeedbackList'
import FeedbackStats from './component/FeebackStats'
import FeedbackForm from './component/FeedbackForm'
import AboutIconLink from './component/AboutIconLink'
import AboutPage from './pages/AboutPage'
import { FeedbackProvider } from './component/context/feedbackContext'
import FeedbackData from './data/feedbackData'

function App() {
  const [feedback, setFeedback] = useState(FeedbackData) //app level state

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }

  const deleteFeedback = (id) => {
    if (window.confirm('are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id)) //Här filterar vi bort the Item med samma id som i parametern.
    }
  }

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
                  <FeedbackForm handleAdd={addFeedback} />
                  <FeedbackStats feedback={feedback} />
                  <FeedbackList
                    feedback={feedback}
                    handleDelete={deleteFeedback}
                  />
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
