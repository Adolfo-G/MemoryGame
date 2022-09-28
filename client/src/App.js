import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/loginAndSignup/Login';
import Signup from './pages/loginAndSignup/Signup';

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
        </Routes>
      </Router>
    </>
  );
}

export default App;
