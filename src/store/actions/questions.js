import { hideLoading } from "react-redux-loading-bar";
import { 
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer
} from "../../utils/_DATA";
import { saveUserAnswer, saveUserQuestion } from "./users";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const SAVE_QUESTION_ANSWER = "SAVE_QUESTION_ANSWER";


function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function saveQuestionAnswer(answer) {
  return {
    type: SAVE_QUESTION_ANSWER,
    answer
  }
}

export function handleSaveQuestionAnswer(qid, answer) {
  return (dispatch, getState) => {
    const  { authedUser } = getState();

    return _saveQuestionAnswer({
      authedUser,
      qid,
      answer
    })
      .then(() => { 
        dispatch(saveQuestionAnswer({qid, answer, authedUser}))
        dispatch(saveUserAnswer({qid, answer, authedUser}))
      })  
      .then(() => dispatch(hideLoading()));
  }
}

export function handleAddQuestion(optionOneText, optionTwoText, author) {
  return (dispatch, getState) => {
    const  { authedUser } = getState();
    const authedUserQuestion = authedUser;
    return _saveQuestion({
      optionOneText,
      optionTwoText,
      author,
    })
    .then((question) => {
      dispatch(addQuestion(question))
      dispatch(saveUserQuestion({question, authedUserQuestion}))
      })
    .then(() => dispatch(hideLoading()));
  }
}