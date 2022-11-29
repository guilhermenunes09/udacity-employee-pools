import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import UnAnsweredQuestions from "./unAnsweredQuestions";
import AnsweredQuestions from "./answeredQuestions";


const Dashboard = ({authedUser, questions, questionIds}) => {
  const navigate = useNavigate();
  const [view, setView] = useState("unanswered");

  useEffect(() => {
    if(!authedUser) {
      navigate('/login');
    }
  }, []);

  const alternateQuestionType = (type) => {
    setView(type);
  }

  return (
    <div className="dashboard">
      { view === "unanswered" ? <h3 className="h-title">Unanswered Questions</h3> : <h3 className="h-title">Answered Questions</h3>}
      
      <button 
        className="btn-action"
        onClick={() => alternateQuestionType("answered")}
        disabled={view === "answered"}
      >
          Answered
      </button>
      
      <button 
        className="btn-action"
        onClick={() => alternateQuestionType("unanswered")}
        disabled={view === "unanswered"}
      >
        Unanswered
      </button>

      { view === "unanswered" ? <UnAnsweredQuestions /> : <AnsweredQuestions />}
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