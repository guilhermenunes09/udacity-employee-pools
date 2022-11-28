import { RECEIVE_USERS, SAVE_USER_ANSWER, SAVE_USER_QUESTION } from "../actions/users";

export default function users(state = {}, action) {
  

  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      }
    case SAVE_USER_ANSWER:
      const { answer, authedUser, qid } = action.answer;

      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer
          }
        }
      }
    case SAVE_USER_QUESTION:
      const { question, authedUserQuestion } = action.question;

      return {
        ...state,
        [authedUserQuestion]: {
          ...state[authedUserQuestion],
          questions: state[authedUserQuestion].questions.concat(question.id)
        }
      }
    default:
      return state
  }
}