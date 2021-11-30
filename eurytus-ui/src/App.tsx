import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar';
import Auth from './Components/Auth/Auth';
import {
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App h-full">
      <NavBar/>
      <Routes>
        <Route path="/auth" element={<Auth />}/>
      </Routes>
    </div>
  );
}

export default App;
