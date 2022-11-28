import { useTransition } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/actions/authedUser";

const Nav = ({dispatch, authedUser, user}) => {
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
        <Link to={'/add'}><li>New</li></Link>
      </ul>

      <ul className="nav-avatar">

        <ul>
          <li>
            {user && user.avatarURL && (
              <img width={40} height={40} src={user.avatarURL} />
            )}
            <div className="nav-username">
              {authedUser}
            </div>
          </li>
          <li className="navbar-login">
            { authedUser && (
              <Link onClick={handleLogout}>Logout</Link>
            )}
            { !authedUser && (
              <Link to={'/login'}>Login</Link>
            )}
          </li>
        </ul>


      </ul>
    </div>
  )
}

const mapStateToProps = ({ authedUser, users }) => {
  const user = users[authedUser];
  return {
    authedUser,
    user
  };
}

export default connect(mapStateToProps)(Nav);