import './App.css';
import NavBar from './Components/NavBar';
import Auth from './Components/Auth/Auth';
import ListAll from './Components/Challenges/ListAll/ListAll';
import SolveChallenge from './Components/Challenges/SolveChallenge/SolveChallenge';
import axios from 'axios';

import {
  Routes,
  Route
} from "react-router-dom";

axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App h-full">
      <NavBar/>
      <Routes>
        <Route path="/auth" element={<Auth />}/>
        <Route path="/challenges" element={<ListAll />}/>
        <Route path="/solve/:id" element={<SolveChallenge />}/>
      </Routes>
    </div>
  );
}

export default App;
