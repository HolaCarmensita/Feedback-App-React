import { v4 as uuidv4 } from 'uuid'
import { createContext, useState, useEffect } from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([])
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  useEffect(() => {
    fetchFeedback()
  }, [])

  //Fetch feedback from BackEnd
  const fetchFeedback = async () => {
    const response = await fetch(
      'http://localhost:5000/feedback?_sort=id&_order=desc'
    )
    const data = await response.json()
    setFeedback(data)
    setIsLoading(false)
  }

  //add a feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }

  //Function Delete a feedback
  const deleteFeedback = (id) => {
    if (window.confirm('are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id)) //Här filterar vi bort the Item med samma id som i parametern.
    }
  }

  //Function Update feedbackItem (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_object_literals)
  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    )

    setFeedbackEdit({
      item: {},
      edit: false,
    })
  }

  //Function Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  return (
    //"addFeedback" is the function and "feedbackEDit" is a pice of state that hold the item
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
