import { useEffect } from "react";
import { connect } from "react-redux";
import Question from "./question";
import { useNavigate } from "react-router-dom";

const Dashboard = ({authedUser, questions, questionIds}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if(!authedUser) {
      navigate('/login');
    }
  }, [])

  return (
    <div className="dashboard">
      <h3 className="h-title">New Questions</h3>
      <ul>
        {
          questionIds && questionIds.map((id) => {
            if (!questions[id].optionOne.votes.includes(authedUser) &&
                !questions[id].optionTwo.votes.includes(authedUser)
            ) {
              return (
                <li className="small-question-card" key={id}>
                  <Question done={false} id={id} />
                </li>
              )}
            }
          )
        }
      </ul>
      
      <h3 className="h-title">Answered</h3>
      <ul>
        {
          questionIds && questionIds.map((id) => {
            if (questions[id].optionOne.votes.includes(authedUser) || 
                questions[id].optionTwo.votes.includes(authedUser)
            ) {
              return (
                <li className="small-question-card" key={id}>
                  <Question done={true} id={id} />
                </li>
              )}
            }
          )
        }
      </ul>
    </div>
  )
}

const mapStateToProps = ({ authedUser, questions }) => {

  return {
    authedUser,
    questions,
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
  }
}

export default connect(mapStateToProps)(Dashboard);