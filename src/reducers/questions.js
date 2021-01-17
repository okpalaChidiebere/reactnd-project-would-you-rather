import { GET_QUESTIONS, UPDATE_QUESTION_VOTE, 
  REMOVE_QUESTION_VOTE, ADD_QUESTION } from '../actions/questions'

export default function questions (state = {}, action) {
  switch(action.type) {
    case GET_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }

    case UPDATE_QUESTION_VOTE : {
      const { authedUser, qid, answer } = action
      //console.log(state) //you will notice that you are only the 'questions' slice of state printed because you are only working on this part of the state store
      //console.log(state[qid][answer].votes)

      let question = {}
      if(qid != null){

        question = {

          [qid]: {
            ...state[qid],
            [answer]: {
              ...state[qid][answer],
              votes: state[qid][answer].votes.concat([authedUser])
            }
          }
        }

      }
      
      return {
        ...state, //keep other question as they were 
        ...question, //spread the modified question across our new question state
      }
    }

    case REMOVE_QUESTION_VOTE : {

      const { authedUser, qid, answer } = action
      let question = {}

      if(qid != null){

        question = {

          [qid]: {
            ...state[qid],
            [answer]: {
              ...state[qid][answer],
              votes: state[qid][answer].votes.filter(userID => userID !== authedUser)
            }
          }
        }

      }
      
      return {
        ...state, //keep other question as they were 
        ...question, //spread the modified question across our new question state
      }
    }

    case ADD_QUESTION : {

      const { question } = action
      console.log(question)
      return{
        ...state,
        [question.id]: question,
      }
    }
    
    default :
      return state
  }
}  