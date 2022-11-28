import { connect } from "react-redux";
import Question from "./question";


const Dashboard = ({authedUser, questions, questionIds}) => {

  return (
    <div className="dashboard">
      { authedUser && (
        <h3 className="h-title">New Questions</h3>
      )}
      { !authedUser && (
        <h3 className="h-title">Questions</h3>
      )}
      
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
      
      { authedUser && (
        <h3 className="h-title">Answered</h3>
      )}

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
  };
};

export default connect(mapStateToProps)(Dashboard);