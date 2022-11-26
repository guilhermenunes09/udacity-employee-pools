import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { receiveQuestions } from "../store/actions/questions";

const QuestionsPage = () => {

  useEffect(() => {
    console.log(receiveQuestions({
      my_first_data: 'First Data'
    }))
  });

  return (
    <Fragment>
      Questions Page
    </Fragment>
  )
}

export default QuestionsPage;