export const GET_QUESTIONS = 'GET_QUESTIONS'

//get questions action creator
export function getQuestions (questions) {
  return {
    type: GET_QUESTIONS,
    questions,
  }
}