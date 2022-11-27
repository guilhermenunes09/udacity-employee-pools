import {
  RECEIVE_QUESTIONS, 
  ADD_QUESTION, 
  SAVE_QUESTION_ANSWER 
} from "../actions/questions"

export default function questions(state = {}, action) {
  console.log('check state', state)
  console.log('check action', action)
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      }
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      }
    case SAVE_QUESTION_ANSWER:
      const { answer } = action;

      return {
        ...state,
        [answer.qid]: {
          ...state[answer.qid],
          [answer.answer]: {
            ...state[answer.qid][answer.answer],
            votes: state[answer.qid][answer.answer].votes.concat(answer.authedUser)
          }
        }
      }
    default:
      return state
  }
}