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
import NotFound from './components/notFound';

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  return (
    <Fragment>
      <LoadingBar style={{ backgroundColor: 'blue', height: '5px' }} />
      <div className="App">
        <Nav />
        { !props.loading && !props.authedUser && (
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        )}
        { !props.loading && (
          <Routes>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/questions/:question_id" element={<QuestionPage />} />
            <Route path="/new" element={<NewQuestion />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route component={NotFound} />
          </Routes>
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