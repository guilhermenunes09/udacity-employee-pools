import { connect } from "react-redux";
import Question from "./question";

const Dashboard = (props) => {

  return (
    <div className="dashboard">
      <h3 className="h-title">New Questions</h3>
      <ul>
        {
          props.questionIds && props.questionIds.map((id) => {
            if (!props.questions[id].optionOne.votes.includes(props.authedUser) &&
                !props.questions[id].optionTwo.votes.includes(props.authedUser)
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
      
      <h3 className="h-title">Done</h3>
      <ul>
        {
          props.questionIds && props.questionIds.map((id) => {
            if (props.questions[id].optionOne.votes.includes(props.authedUser) || 
                props.questions[id].optionTwo.votes.includes(props.authedUser)
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