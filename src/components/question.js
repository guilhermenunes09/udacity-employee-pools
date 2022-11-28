import { Fragment } from "react";
import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

const Question = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`questions/${props.id}`)
  }

  return (
    <Fragment>
      <div className="small-question-card-content">
        <h3>{props.question && props.question.author}</h3>
        <div>{ formatDate(props.question && props.question.timestamp) }</div>
        <button className="btn-action" onClick={handleClick}>Show</button>
      </div>
    </Fragment>
  )
}

const mapStateToProps = ({ authedUser, questions }, {id}) => {
  const question = questions[id];

  return {
    authedUser,
    question: question ? question : null,
  };
};

export default connect(mapStateToProps)(Question);
