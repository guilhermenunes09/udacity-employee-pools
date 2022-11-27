import { hideLoading } from "react-redux-loading-bar";
import { _getQuestions, _saveQuestion } from "../../utils/_DATA";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";

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

export function handleAddQuestion(optionOneText, optionTwoText, author) {
  return (dispatch) => {

    return _saveQuestion({
      optionOneText,
      optionTwoText,
      author,
    })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()));
  }
}