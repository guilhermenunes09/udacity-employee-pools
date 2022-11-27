import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import QuestionPage from "./questionPage";

const Dashboard = (props) => {

  return (
    <Fragment>
      <h3>Questions</h3>
      <ul>
        {
          props.questionIds && props.questionIds.map((id) => (
            <li key={id}>
              <QuestionPage id={id} />
            </li>
          ))
        }
      </ul>
    </Fragment>
  )
}

const mapStateToProps = ({ questions }) => {

  return {
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
  }
}

export default connect(mapStateToProps)(Dashboard);