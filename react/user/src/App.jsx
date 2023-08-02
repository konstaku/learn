import './user.css';
import user from './user.json';
import { UserCard } from './UserCard';

function App() {
  return (
    <div>
      <UserCard
        name={user.name}
        age={user.age}
        phoneNumber={user.phoneNumber}
        address={user.address}
      ></UserCard>
      <br />
      <UserCard
        name={user.name}
        age={user.age}
        phoneNumber={user.phoneNumber}
        address={user.address}
      ></UserCard>
    </div>
  );
}

export default App;
