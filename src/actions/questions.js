export const GET_QUESTIONS = 'GET_QUESTIONS'
export const UPDATE_QUESTION_VOTE = 'UPDATE_QUESTION_VOTE'
export const REMOVE_QUESTION_VOTE = 'REMOVE_QUESTION_VOTE'


//get questions action creator
export function getQuestions (questions) {
  return {
    type: GET_QUESTIONS,
    questions,
  }
}

export const updateQuestionVote = ({ authedUser, qid, answer }) => ({
  type: UPDATE_QUESTION_VOTE,
  authedUser,
  qid,
  answer
})

export const removeQuestionVote = ({ authedUser, qid, answer }) => ({
  type: REMOVE_QUESTION_VOTE,
  authedUser,
  qid,
  answer
})