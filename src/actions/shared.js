import { getInitialData } from '../api/api'
import { getUsers, updateUserAnswers, removeUserAnswers } from './users'
import { getQuestions, updateQuestionVote, removeQuestionVote } from './questions'
import { saveQuestionAnswer } from '../api/api'


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
