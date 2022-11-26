import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { receiveQuestions } from "../store/actions/questions";

const QuestionsPage = (props) => {
  return (
    <Fragment>
      Questions Page
    </Fragment>
  )
}

const mapStateToProps = ({ questions }) => {
  return {
    questions: questions
  }
}

export default connect(mapStateToProps)(QuestionsPage);