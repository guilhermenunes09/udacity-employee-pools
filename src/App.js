import { useEffect, Fragment } from 'react';
import { connect } from "react-redux";
import './App.css';
import Dashboard from './components/dashboard';
import { handleInitialData } from './store/actions/shared';
import { Routes, Route } from 'react-router-dom';
import QuestionPage from './components/questionPage';
import NewQuestion from './components/newQuestion';
import LoadingBar from "react-redux-loading-bar";
import Nav from './components/Nav';
import Leaderboard from './components/leaderboard';

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  return (
    <Fragment>
      <LoadingBar />
      <div className="App">
        <Nav />
        { props.loading === true ? null : (
          <Routes>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/question/:id" element={<QuestionPage />} />
            <Route path="/new" element={<NewQuestion />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        )}
      </div>
    </Fragment>
  );
}

const mapStateToProps = ({authedUser}) => (
  {
    loading: authedUser === null,
  }
)


export default connect(mapStateToProps)(App);