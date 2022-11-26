import { getInitialData } from "../../utils/api";
import { receiveQuestions } from "./questions";

export function handleInitialData () {
  return (dispatch) => {

    return getInitialData().then(({questions}) => {
      dispatch(receiveQuestions(questions));
    })
  }
}
