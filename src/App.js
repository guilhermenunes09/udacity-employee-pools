import { useEffect, Fragment } from 'react';
import { connect } from "react-redux";
import './App.css';
import QuestionsPage from './components/questionsPage';
import { handleInitialData } from './store/actions/shared';

const App = (props) => {

  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  return (
    <div className="App">
      <QuestionsPage />
    </div>
  );
}

export default connect()(App);