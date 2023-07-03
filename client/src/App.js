
import './App.css';
import {Router, Route, Routes} from 'react-router-dom';
import { Login } from './pages';
import { Navbar } from './components';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
