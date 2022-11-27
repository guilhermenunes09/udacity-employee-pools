import { getInitialData } from "../../utils/api";
import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";
import { setAuthedUser } from "./authedUser";
import { showLoading, hideLoading } from "react-redux-loading-bar";

const INITIAL_USER = {
  username: 'sarahedo',
  password:'password123',
}

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({users, questions}) => {
      dispatch(setAuthedUser(INITIAL_USER.username, INITIAL_USER.password));
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(hideLoading());
    });
  }
}
