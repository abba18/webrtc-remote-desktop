import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import DashBoard from './pages/index.jsx'
import Monitor from './pages/monitor/index.jsx'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/monitor" element={<Monitor />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
