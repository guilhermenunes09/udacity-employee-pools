import { connect } from 'react-redux';
import { useRef } from 'react';
import { handleAuthenticate } from '../store/actions/authedUser';

const Login = ({ dispatch }) => {


  const userInput = useRef();
  const passwordInput = useRef();

  const handleSubmit = () => {
    const user = userInput.current.value;
    const password = passwordInput.current.value;

    dispatch(handleAuthenticate(user, password));
    passwordInput.current.value = "";
  }

  return (
    <div>
      <label>Username</label>
      <input ref={userInput} />
      <label>password</label>
      <input ref={passwordInput} />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}


export default connect()(Login);