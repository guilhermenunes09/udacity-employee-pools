import { useTransition } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/actions/authedUser";

const Nav = ({dispatch, authedUser, user}) => {

  console.log('who is user', useTransition)
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      navigate('/login');
    });
  }

  return (
    <div className="navbar">
      <ul className="navbar-menu">
        <Link to={'/'}><li>Home</li></Link>
        <Link to={'/leaderboard'}><li>Leaderboard</li></Link>
        <Link to={'/new'}><li>New</li></Link>
      </ul>

      <ul className="navbar-login">
        { authedUser && (
          <Link onClick={handleLogout}>Logout</Link>
        )}
        { !authedUser && (
          <Link to={'/login'}>Login</Link>
        )}
      </ul>

      <ul className="nav-avatar">
        {user && user.avatarURL && (
          <img width={40} height={40} src={user.avatarURL} />
        )}
        <div className="nav-username">
          {authedUser}
        </div>
      </ul>
    </div>
  )
}

const mapStateToProps = ({ authedUser, users }) => {
  console.log('who is USERS', users)
  const user = users[authedUser];
  return {
    authedUser,
    user
  };
}

export default connect(mapStateToProps)(Nav);