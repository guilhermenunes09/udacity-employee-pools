import { connect } from 'react-redux';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleAuthenticate } from '../store/actions/authedUser';
import { useLocation } from 'react-router-dom';


const Login = (props) => {
  let location = useLocation();
  const [failed, setFailed] = useState(false);
  const navigate = useNavigate();
  const userInput = useRef();
  const passwordInput = useRef();

  const handleSubmit = () => {
    const user = userInput.current.value;
    const password = passwordInput.current.value;

    props.dispatch(handleAuthenticate(user, password)).then(() => {
      if(location.state && location.state.qid) {
        navigate(`/questions/${location.state.qid}`)
      } else {
        navigate('/');
      }
    }).catch(() => {
      setFailed(true);
    });
    passwordInput.current.value = "";
  }

  return (
    <div className="dashboard">
      <h3 className="h=title">Login</h3>

      <label>Username</label>

      <input data-testid="loginusername" defaultValue={"sarahedo"} className='login-input' ref={userInput} />

      <label>password</label>

      <input data-testid="login-password" defaultValue={"password123"} type="password" className='login-input' ref={passwordInput} />
      
      <div>
        <button data-testid="submit-button" className='btn-action' onClick={handleSubmit}>Submit</button>
      </div>

      { failed && (
        <div data-testid="error-message">
          Wrong username or password! Please try again.
        </div>
      )}
    </div>
  )
}

export default connect()(Login);
