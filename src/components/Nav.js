import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/actions/authedUser";

const Nav = ({dispatch, authedUser}) => {
  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <div>
      <ul>
        <Link to={'/'}><li>Home</li></Link>
        <Link to={'/leaderboard'}><li>Leaderboard</li></Link>
        <Link to={'/new'}><li>New</li></Link>
      </ul>

      <div>
        Avatar
        {authedUser}
      </div>

      <div>
        { authedUser && (
          <div onClick={handleLogout}>Logout</div>
        )}
        { !authedUser && (
          <Link to={'/login'}>Login</Link>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser
  };
}

export default connect(mapStateToProps)(Nav);