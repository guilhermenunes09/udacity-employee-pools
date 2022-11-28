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

const QuestionPage = ({
    dispatch, 
    question, 
    users, 
    question_id, 
    avatar, 
    authedUser, 
    optionOnePercentage, 
    optionTwoPercentage,
    authorName,
    optionOneText,
    optionTwoText,
    optionOneIncludesAuthedUser,
    optionTwoIncludesAuthedUser,
    optionOneVotesQuantity,
    optionTwoVotesQuantity
  }) => {
  const navigate = useNavigate();
  
  const submitOptionOne = (e) => {
    e.preventDefault();
    if (!question.optionOne.votes.includes(authedUser) && 
        !question.optionTwo.votes.includes(authedUser)) {
          dispatch(handleSaveQuestionAnswer(question_id, "optionOne"));
      }
  }
  
  const submitOptionTwo = (e) => {
    e.preventDefault();
    if (!question.optionOne.votes.includes(authedUser) && 
        !question.optionTwo.votes.includes(authedUser)) {
          dispatch(handleSaveQuestionAnswer(question_id, "optionTwo"));
      }
  }

  useEffect(() => {
    if(!authedUser) {
      navigate('/login');
    }
  }, [])

  return (
    <div className="poll-page">
      <h3>Poll by {authorName}</h3>
      <div>
        <img width={200} height={200} src={`\\${avatar}`} />
      </div>
      <h3>Would You Rather...</h3>
      <div className="poll-options">
        <div className="option">
          <h4>{optionOneText}</h4>
          <button
            className={optionOneIncludesAuthedUser ? 'btn-pressed' : 'btn-action'}
            disabled={
              optionOneIncludesAuthedUser ||
              optionTwoIncludesAuthedUser
            }
            onClick={submitOptionOne}
          >
              Option 1
          </button>
        </div>
        <div className="option">
          <h4>{optionTwoText}</h4>
          <button
            className={optionTwoIncludesAuthedUser ? 'btn-pressed' : 'btn-action'}
            disabled={
              optionOneIncludesAuthedUser ||
              optionTwoIncludesAuthedUser
            }
            onClick={submitOptionTwo}
          >
              Option 2
          </button>
        </div>
      </div>
      <div className="poll-page-choice">
        <ul>
          { optionOneIncludesAuthedUser && (
            <div>Would You Rather <strong>{`${optionOneText}`}</strong></div>
          )}
          { optionTwoIncludesAuthedUser && (
            <div>Would You Rather <strong>{`${optionTwoText}`}</strong></div>
          )}
        </ul>


        <ul className="poll-page-choice">
          <li>
            <h5>Option 1</h5>
            {optionOneVotesQuantity} votes<br/>
            
            {optionOnePercentage}% people voted on this option
          </li>
          <li>
            <h5>Option 2</h5>
            {optionTwoVotesQuantity} votes<br/>
            
            {optionTwoPercentage}% people voted on this option
          </li>
        </ul>
      </div>

    </div>
  )
}

const mapStateToProps =({authedUser, questions, users = []}, props) => { 
  let avatar;
  let users_quantity = 0;
  let optionOnePercentage = null;
  let optionTwoPercentage = null;
  let authorName = "";
  let optionOneText = "";
  let optionTwoText = "";
  let optionOneIncludesAuthedUser = null;
  let optionTwoIncludesAuthedUser = null;
  let optionOneVotesQuantity = 0;
  let optionTwoVotesQuantity = 0;

  const {question_id} = props.router.params;
  const question = questions[question_id];

  if(Object.keys(users).length > 0) {
    if(question) {
      avatar = users[question.author].avatarURL;
      authorName = users[question.author].name;
    }
    users_quantity = Object.keys(users).length;
  }

  if(question) {
    optionOnePercentage = (question.optionOne.votes.length * 100)/users_quantity;
    optionTwoPercentage = (question.optionTwo.votes.length * 100)/users_quantity;
    optionOneText = question.optionOne.text;
    optionTwoText = question.optionTwo.text;
    optionOneIncludesAuthedUser = question.optionOne.votes.includes(authedUser);
    optionTwoIncludesAuthedUser = question.optionTwo.votes.includes(authedUser);
    optionOneVotesQuantity = question.optionOne.votes.length;
    optionTwoVotesQuantity = question.optionTwo.votes.length;
  }

  if(question_id) {
    return { 
      question_id, 
      question, 
      users, 
      authedUser, 
      avatar, 
      optionOnePercentage, 
      optionTwoPercentage,
      authorName,
      optionOneText,
      optionTwoText,
      optionOneIncludesAuthedUser,
      optionTwoIncludesAuthedUser,
      optionOneVotesQuantity,
      optionTwoVotesQuantity
    }
  }

  return { question, users }
}

export default withRouter(connect(mapStateToProps)(QuestionPage));
