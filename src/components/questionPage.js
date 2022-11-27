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
    dispatch(handleSaveQuestionAnswer(id, "optionOne"));
  }
  
  const submitOptionTwo = (e) => {
    e.preventDefault();
    dispatch(handleSaveQuestionAnswer(id, "optionTwo"));
  }

  return (
    <div>
      <h3>Poll by {users[question.author].name}</h3>
      <div>{users[question.author].avatarURL}</div>
      <div>
        {question.optionOne.text}
        <button onClick={submitOptionOne}>Option 1</button>
      </div>
      <div>
        {question.optionTwo.text}
        <button onClick={submitOptionTwo}>Option 2</button>
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
