import { connect } from "react-redux";

const Leaderboard = ({ users }) => {

  return (
    <div className="dashboard">
      <h3 className="h-title">Leaderboard</h3>
      <table id="leaderboard-table">
        <tr>
          <th>Users</th>
          <th>Answered</th>
          <th>Created</th>
        </tr>
        { Array.isArray(users) && users.map((user) => (
          <tr key={user.id}>
            <td className="td-name">
              
              <div className="leaderboard-user-card">
                <img className="leaderboard-img" width={40} height={40} src={user.avatarURL}/>
                <div>
                  <div className="leaderboard-name">{ user.name }</div>            
                  <div className="leaderboard-id"> { user.id } </div>
                </div>
              </div>
              
            </td>
            <td>{ Object.keys(user.answers).length }</td>
            <td>{ Object.keys(user.questions).length }</td>
          </tr>
        ))}
        
      </table>
    </div>
  )
}

const mapStateToProps = ({ users }) => {
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
    users: usersArray
  };
}

export default connect(mapStateToProps)(Leaderboard);