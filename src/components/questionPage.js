import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { handleSaveQuestionAnswer } from "../store/actions/questions";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const QuestionPage = ({dispatch, question, users, id, avatar, authedUser}) => {
  const navigate = useNavigate();
  
  const submitOptionOne = (e) => {
    e.preventDefault();
    if (!question.optionOne.votes.includes(authedUser) && 
        !question.optionTwo.votes.includes(authedUser)) {
          dispatch(handleSaveQuestionAnswer(id, "optionOne"));
      }
  }
  
  const submitOptionTwo = (e) => {
    e.preventDefault();
    if (!question.optionOne.votes.includes(authedUser) && 
        !question.optionTwo.votes.includes(authedUser)) {
          dispatch(handleSaveQuestionAnswer(id, "optionTwo"));
      }
  }

  useEffect(() => {
    if(!authedUser) {
      navigate('/login');
    }
  }, [])

  return (
    <div className="poll-page">
      <h3>Poll by {users[question.author].name}</h3>
      <div>{users[question.author].avatarURL}</div>

      <div className="poll-options">
        <div className="option">
          <h4>{question.optionOne.text}</h4>
          <button
            className={question.optionOne.votes.includes(authedUser) ? 'btn-pressed' : 'btn-action'}
            disabled={
              question.optionOne.votes.includes(authedUser) ||
              question.optionTwo.votes.includes(authedUser)
            }
            onClick={submitOptionOne}
          >
              Option 1
          </button>
        </div>
        <div className="option">
          <h4>{question.optionTwo.text}</h4>
          <button
            className={question.optionTwo.votes.includes(authedUser) ? 'btn-pressed' : 'btn-action'}
            disabled={
              question.optionOne.votes.includes(authedUser) ||
              question.optionTwo.votes.includes(authedUser)
            }
            onClick={submitOptionTwo}
          >
              Option 2
          </button>
        </div>
      </div>
      <div className="poll-page-choice">
        { question.optionOne.votes.includes(authedUser) && (
          <div>Would You Rather <strong>{`${question.optionOne.text}`}</strong></div>
        )}
        { question.optionTwo.votes.includes(authedUser) && (
          <div>Would You Rather <strong>{`${question.optionTwo.text}`}</strong></div>
        )}
      </div>

    </div>
  )
}

const mapStateToProps =({authedUser, questions, users}, props) => {
  const {id} = props.router.params;
  const question = questions[id];
  if(id) {
    return { id, question, users, authedUser }
  }

  return { question, users }
}

export default withRouter(connect(mapStateToProps)(QuestionPage));
