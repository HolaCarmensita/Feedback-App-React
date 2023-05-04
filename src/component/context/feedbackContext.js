import { v4 as uuidv4 } from 'uuid'
import { createContext, useState } from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: 'This item is feedbackItem 1',
      rating: 10,
    },
    {
      id: 2,
      rating: 9,
      text: 'This item is feedbackItem 2',
    },
    {
      id: 3,
      rating: 7,
      text: 'This item is feedbackItem 3',
    },
  ])

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

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
