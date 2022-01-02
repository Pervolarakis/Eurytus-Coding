import './App.css';
import NavBar from './Components/NavBar/NavBar';
import Auth from './Components/Auth/Auth';
import ListAll from './Components/Challenges/ListAll/ListAll';
import SolveChallenge from './Components/Challenges/SolveChallenge/SolveChallenge';
import {axios} from './Api/eurytusInstance';
import CreateChallenge from './Components/Challenges/CreateChallenge/CreateChallenge';
import { Routes,Route } from "react-router-dom";
import { UserContext } from './Contexts/UserContext';
import { useEffect, useState } from 'react';
import AdminPage from './Components/AdminPage/AdminPage';
import AdminDashboard from './Components/AdminPage/AdminDashboard';
import AdminAllChallenges from './Components/AdminPage/AdminAllChallenges';
import AdminPendingRequests from './Components/AdminPage/AdminPendingRequests';
import PreviewCreateChallengeRequest from './Components/AdminPage/ModerateChallenges/PreviewCreateChallengeRequest';



function App() {

  const [user,setUser] = useState(null)

  useEffect(()=>{
    axios.get('/users/auth/currentuser')
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
              <Route path="/createchallenge" element={<CreateChallenge />}/>
              <Route path="/solve/:challengeId" element={<SolveChallenge />}/>
              <Route path="/admin" element={<AdminPage/>}>
                <Route path="/admin/challenges" element={<AdminAllChallenges/>}/>
                <Route path="/admin" element={<AdminDashboard/>}/>
                <Route path="/admin/requests" element={<AdminPendingRequests/>}/>
              </Route>
              <Route path="/admin/review/create/:requestId" element={<PreviewCreateChallengeRequest/>}/>
            </Routes>:<>
            <Routes>
              <Route path="/auth" element={<Auth />}/>
            </Routes>
          </>
          }
      </UserContext.Provider>
    </div>
  );
}

export default App;
