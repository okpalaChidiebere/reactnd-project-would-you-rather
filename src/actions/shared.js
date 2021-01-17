import { getInitialData } from '../api/api'
import { getUsers, updateUserAnswers, removeUserAnswers, 
  addQuestion as addUserQuestion } from './users'
import { getQuestions, updateQuestionVote, removeQuestionVote, addQuestion } from './questions'
import { saveQuestionAnswer, saveQuestion } from '../api/api'



export const handleInitialData = () => async (dispatch) => {

    try {

        const { users, questions } = await getInitialData()
        dispatch(getUsers(users))
        dispatch(getQuestions(questions))
    }catch(e){
        console.warn('ERROR!', e)
        alert("Error fetching data")
    }
}

export const handleVoteQuestion = (info) => async (dispatch) => {

    try {
      /*We are using Optimistic Updates in this operation */
      dispatch(updateQuestionVote(info))
      dispatch(updateUserAnswers(info))
      await saveQuestionAnswer(info)
  
    }catch(e){
      console.warn('Error in handleVoteQuestion: ', e)
      dispatch(removeQuestionVote(info)) //we dispatch remove so that it will reset back to what it initially was
      dispatch(removeUserAnswers(info))
      alert('There was an error voting for this question. Try again.')
    }
  }

export const handleAddQuestion = ( optionOneText, optionTwoText ) => async (dispatch, getState) => {

  const { authedUser } = getState() //getState method returns the current state of our store

  try {
    /*We are using Optimistic Updates in this operation */

    const question = await saveQuestion({optionOneText, optionTwoText, author: authedUser})
    console.log(question)
    dispatch(addQuestion(question))
    dispatch(addUserQuestion(question))
  
    }catch(e){
      console.warn('Error in handleAddQuestion: ', e)
      alert('There was an error adding new quesion. Try again.')
    }
}
