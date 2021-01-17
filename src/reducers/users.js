import { GET_USERS, UPDATE_USER_ANSWERS, 
  REMOVE_USER_ANSWERS, ADD_QUESTION } from '../actions/users'

export default function users (state = {}, action) {
  switch(action.type) {
    case GET_USERS :
      return {
        ...state,
        ...action.users
      }

    case UPDATE_USER_ANSWERS : {

      const { authedUser, qid, answer } = action

      let user = {}
      if(qid != null){

        user = {
          [authedUser]: {
            ...state[authedUser],
            answers: {
              ...state[authedUser].answers,
              [qid]: answer
            }
          }
        }
      }

      return{
        ...state,
        ...user,
      }
    }

    case REMOVE_USER_ANSWERS : {

      const { authedUser, qid } = action

      let filteredAnswers = {...state[authedUser].answers}
      delete filteredAnswers[qid]

      const user = {
        ...state[authedUser],
        answers: filteredAnswers
      }
      
      return{
        ...state,
        [authedUser]: user,
      }

    }

    case ADD_QUESTION : {

      const { question } = action

      let user = {
        [question.author]: {
          ...state[question.author],
          questions: [ //questions is an array
            ...state[question.author].questions,
            question.id
          ]
        }
      }

      return{
        ...state,
        ...user,
      }
    }

    default :
      return state
  }
} 