import UserContext from './context/UserContext';
import './App.css';
import Login from './components/Login/Login';

function App() {

  const userData = {
    email: null,
    pwd: null
  }

  return (
    <>
      <UserContext.Provider value={userData}>
        <Login/>
      </UserContext.Provider>
    </>
  );
}

export default App;
