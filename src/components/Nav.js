import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Nav = (props) => {
  console.log('NAV PROPS', props)

  return (
    <div>
      <ul>
        <Link to={'/'}><li>Home</li></Link>
        <Link to={'/leaderboard'}><li>Leaderboard</li></Link>
        <Link to={'/new'}><li>New</li></Link>
      </ul>

      <div>
        Avatar
        {props.authedUser}
      </div>

      <div>
        { props.authedUser && (
          <div>Logout</div>
        )}
        { !props.authedUser && (
          <div>Login</div>
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