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

const QuestionPage = ({dispatch, question, users, id, avatar}) => {
  const submitOptionOne = (e) => {
    e.preventDefault();
    if (!question.optionOne.votes.includes(question.author) && 
        !question.optionTwo.votes.includes(question.author)) {
          dispatch(handleSaveQuestionAnswer(id, "optionOne"));
      }
  }
  
  const submitOptionTwo = (e) => {
    e.preventDefault();
    if (!question.optionOne.votes.includes(question.author) && 
        !question.optionTwo.votes.includes(question.author)) {
          dispatch(handleSaveQuestionAnswer(id, "optionTwo"));
      }
  }

  return (
    <div className="poll-page">
      <h3>Poll by {users[question.author].name}</h3>
      <div>{users[question.author].avatarURL}</div>

      <div className="poll-options">
        <div className="option">
          <h4>{question.optionOne.text}</h4>
          <button
            className={question.optionOne.votes.includes(question.author) ? 'btn-pressed' : 'btn-action'}
            onClick={submitOptionOne}
            disabled={question.optionTwo.votes.includes(question.author)}
          >
              Option 1
          </button>
        </div>
        <div className="option">
          <h4>{question.optionTwo.text}</h4>
          <button
            className={question.optionTwo.votes.includes(question.author) ? 'btn-pressed' : 'btn-action'}
            onClick={submitOptionTwo}
            disabled={question.optionOne.votes.includes(question.author)}
          >
              Option 2
          </button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps =({questions, users}, props) => {
  const {id} = props.router.params;
  const question = questions[id];
  if(id) {
    return { id, question, users }
  }

  return { question, users }
}

export default withRouter(connect(mapStateToProps)(QuestionPage));
