import './App.css';
import NavBar from './Components/NavBar/NavBar';
import Auth from './Components/Auth/Auth';
import ListAll from './Components/Challenges/ListAll/ListAll';
import SolveChallenge from './Components/Challenges/SolveChallenge/SolveChallenge';
import axios from 'axios';
import CreateChallenge from './Components/Challenges/CreateChallenge/CreateChallenge';

import {
  Routes,
  Route
} from "react-router-dom";
import { UserContext } from './Contexts/UserContext';
import { useEffect, useState } from 'react';

axios.defaults.withCredentials = true;

function App() {

  const [user,setUser] = useState(null)

  useEffect(()=>{
    axios.get('http://eurytus.com/api/v1/users/auth/currentuser')
        .then((res)=>setUser(res.data.data||null))
  },[])

  return (
    <div className="App h-full">
      <UserContext.Provider value={{user, setUser}}>
        <NavBar/>
          {
            (user)?
            <Routes>
              <Route path="/challenges" element={<ListAll />}/>
              <Route path="/solve/:challengeId" element={<SolveChallenge />}/>
              <Route path="/createchallenge" element={<CreateChallenge />}/>
            </Routes>:
            <Routes>
              <Route path="/auth" element={<Auth />}/>
            </Routes>
          }
      </UserContext.Provider>
    </div>
  );
}

export default App;
