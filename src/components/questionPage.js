import { connect } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Question from "./question";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const QuestionPage = (props) => {

  return (
    <div>
      <Question id={props.id} />
    </div>
  )
}

const mapStateToProps =({questions}, props) => {
  const {id} = props.router.params;
  
  if(id) {
    return { id, questions }
  }

  return { questions }
}

export default withRouter(connect(mapStateToProps)(QuestionPage));
