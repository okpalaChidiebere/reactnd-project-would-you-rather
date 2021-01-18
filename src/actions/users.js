export const GET_USERS = 'GET_USERS'
export const UPDATE_USER_ANSWERS = 'UPDATE_USER_ASNWERS'
export const REMOVE_USER_ANSWERS = 'REMOVE_USER_ASNWERS'
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION'


export function getUsers (users) {
  return {
    type: GET_USERS,
    users,
  }
} 

export const updateUserAnswers = ({ authedUser, qid, answer }) => ({
  type: UPDATE_USER_ANSWERS,
  authedUser,
  qid,
  answer
})

export const removeUserAnswers = ({ authedUser, qid, answer }) => ({
  type: REMOVE_USER_ANSWERS,
  authedUser,
  qid,
  answer
})

export const addQuestion = (question) => {
  //console.log(questionId)

  return{
    type: ADD_USER_QUESTION,
    question,
  }
}