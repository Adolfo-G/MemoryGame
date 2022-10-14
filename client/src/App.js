import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/loginAndSignup/Login';
import Signup from './pages/loginAndSignup/Signup';
import Scoreboard from './pages/scoreboard/Scoreboard';
import Profile from './pages/profile/Profile';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path='/signup'
            element={<Signup />}
          />
          <Route
            path='/scoreboard'
            element={<Scoreboard/>}
          />
          <Route
          path='/profile'
          element={<Profile/>}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
