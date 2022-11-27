import { _authenticate } from "../../utils/_DATA";
import { hideLoading } from "react-redux-loading-bar";

export const SET_AUTHED_USER = "SET_AUTHED_USERS";

export function setAuthedUser(id) {
   return {
      type: SET_AUTHED_USER,
      id,
   };
}

export function handleAuthenticate(username, password) {
   return (dispatch) => {

      return _authenticate({
         username,
         password
      })
      .then((user) => {
         dispatch(setAuthedUser(user.id));
      })
      .then(() => dispatch(hideLoading()));
   }
}
