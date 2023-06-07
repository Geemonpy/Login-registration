import logo from './logo.svg';
import './App.css';
import Registration from './Components/Registration';
import LoginPage from './Components/LoginPage';
import Home from './Components/home';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
 
      <Router>
      <Routes>
        <Route path="/registration" element={<Registration/>} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={ <Home/>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
