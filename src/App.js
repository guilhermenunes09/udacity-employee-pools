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
import Login from './components/login';
import {NotFound} from './components/notFound';

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  return (
    <Fragment>
      <LoadingBar style={{ backgroundColor: 'blue', height: '5px' }} />
      <div className="App">
        <Nav />
        { !props.loading && (
          <switch>
          <Routes>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/questions/:question_id" exact element={<QuestionPage />} />
            <Route path="/new" exact element={<NewQuestion />} />
            <Route path="/leaderboard" exact element={<Leaderboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </switch>
        )}
      </div>
    </Fragment>
  );
}

const mapStateToProps = ({authedUser, loadingBar}) => {
  const loading = loadingBar.default;
  console.log('loading', loading)
 
  return {
    loading,
    authedUser
  }
}


export default connect(mapStateToProps)(App);