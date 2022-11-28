import { connect } from "react-redux";
import { useEffect, useRef } from 'react';
import { handleAddQuestion } from '../store/actions/questions';
import { useNavigate } from "react-router-dom";

const NewQuestion = ({ dispatch, authedUser }) => {
  const firstOptionInput = useRef();
  const secondOptionInput = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    if(!authedUser) {
      navigate('/login');
    }
  }, []);

  const handleSubmit = () => {
    const firstOption = firstOptionInput.current.value;
    const secondOption = secondOptionInput.current.value;
    
    dispatch(handleAddQuestion(firstOption, secondOption, authedUser))

    firstOptionInput.current.value = "";
    secondOptionInput.current.value = "";
  }

  return (
    <div className="poll-page">
      <h3 className="h=title">Would You Rather</h3>

      <div className="poll-options-new">
        <div className="option-new">
          <label>First Option</label>
          <input ref={firstOptionInput} />
        </div>

        <div className="option-new">
          <label>Second Option</label>
          <input ref={secondOptionInput} />
        </div>
      </div>

      <button className="btn-action" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  )
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(NewQuestion);