import { connect } from "react-redux";
import { useRef } from 'react';
import { handleAddQuestion } from '../store/actions/questions';

const NewQuestion = ({ dispatch, id }) => {
  const firstOptionInput = useRef();
  const secondOptionInput = useRef();

  const handleSubmit = () => {
    const firstOption = firstOptionInput.current.value;
    const secondOption = secondOptionInput.current.value;
    
    dispatch(handleAddQuestion(firstOption, secondOption, 'Guilherme'))

    firstOptionInput.current.value = "";
    secondOptionInput.current.value = "";
  }


  return (
    <div>
      <h3>Would You Rather</h3>

      <label>First Option</label>
      <input ref={firstOptionInput} />

      <label>Second Option</label>
      <input ref={secondOptionInput} />

      <button onClick={handleSubmit}>
        Submit
      </button>
    </div>
  )
}

export default connect()(NewQuestion);