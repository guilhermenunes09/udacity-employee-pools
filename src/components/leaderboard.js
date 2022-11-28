import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const Leaderboard = ({ authedUser, users }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if(!authedUser) {
      navigate('/login');
    }
  }, []);

  return (
    <div className="dashboard">
      <h3 className="h-title">Leaderboard</h3>
      <table id="leaderboard-table">
        <thead>
          <tr>
          <th>Users</th>
          <th>Answered</th>
          <th>Created</th>
          </tr>
        </thead>
        <tbody>
          { Array.isArray(users) && users.map((user) => (
            <tr key={user.id}>
              <td className="td-name">
                
                <div className="leaderboard-user-card">
                  <img className="leaderboard-img" width={40} height={40} src={user.avatarURL}/>
                  <div>
                    <div data-testid={`name-${user.id}`} className="leaderboard-name">{ user.name }</div>            
                    <div className="leaderboard-id"> { user.id } </div>
                  </div>
                </div>
                
              </td>
              <td data-testid={`answer-${user.id}`}>{ Object.keys(user.answers).length }</td>
              <td>{ Object.keys(user.questions).length }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = ({ authedUser, users }) => {
  let usersArray = [];

  if(users) {
    Object.keys(users).map(key => {
      const answersCount = Object.keys(users[key].answers).length;
      const questionsCount = Object.keys(users[key].questions).length;
      users[key]['answeredCount'] = answersCount;
      users[key]['questionsCount'] = questionsCount;
      users[key]['score'] = answersCount + questionsCount;
      usersArray.push(users[key]);
    })
  }

  usersArray.sort((a, b) => b.score - a.score);

  return {
    authedUser,
    users: usersArray
  };
}

export default connect(mapStateToProps)(Leaderboard);