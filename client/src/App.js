import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/loginAndSignup/Login';
import Signup from './pages/loginAndSignup/Signup';
import Scoreboard from './pages/scoreboard/Scoreboard';

function App() {
  return (
    <>
      <Router>
      <Routes>
          <Route
            path="/"
            element={<Home />}
          />
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
