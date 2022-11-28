import { connect } from 'react-redux';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleAuthenticate } from '../store/actions/authedUser';

const Login = ({ dispatch }) => {
  const navigate = useNavigate();
  const userInput = useRef();
  const passwordInput = useRef();

  const handleSubmit = () => {
    const user = userInput.current.value;
    const password = passwordInput.current.value;

    dispatch(handleAuthenticate(user, password)).then(() => {

      navigate('/');
    });
    passwordInput.current.value = "";
  }

  return (
    <div className="dashboard">
      <h3 className="h=title">Login</h3>
      <label>Username</label>
      <input defaultValue={"sarahedo"} className='login-input' ref={userInput} />
      <label>password</label>
      <input defaultValue={"password123"} type="password" className='login-input' ref={passwordInput} />
      <div>
        <button className='btn-action' onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}


export default connect()(Login);