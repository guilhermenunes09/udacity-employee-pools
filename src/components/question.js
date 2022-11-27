import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";
import { Link, useNavigate } from "react-router-dom";
import { formatQuestion } from "../utils/helpers";

const Question = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`question/${props.id}`)
  }

  return (
    <div>
      <h3>{props.question && props.question.author}</h3>
      <div>{ formatDate(props.question && props.question.timestamp) }</div>
      <button onClick={handleClick}>Show</button>
    </div>
  )
}

const mapStateToProps = ({ authedUser, questions }, {id}) => {
  const question = questions[id];

  return {
    authedUser,
    question: question ? question : null,
  }
}

export default connect(mapStateToProps)(Question);