import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/loginAndSignup/Login';
import Signup from './pages/loginAndSignup/Signup';
import Scoreboard from './pages/scoreboard/Scoreboard';
import Profile from './pages/profile/Profile';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <>
      <Router>
        <Navbar />
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
            element={<Scoreboard />}
          />
          <Route
            path='/profile'
            element={<Profile />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
