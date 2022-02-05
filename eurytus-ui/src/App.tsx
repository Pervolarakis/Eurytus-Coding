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
import PreviewUpdateChallengeRequest from './Components/AdminPage/ModerateChallenges/PreviewUpdateChallengeRequest';
import PreviewDeleteChallengeRequest from './Components/AdminPage/ModerateChallenges/PreviewDeleteChallengeRequest';
import UserProfile from './Components/UserProfile/UserProfile';
import EditChallenge from './Components/UserProfile/EditChallenge/EditChallenge'
import ChallengeStats from './Components/ChallengeStats/ChallengeStats';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [user,setUser] = useState<{
    id: string, 
    email: string, 
    role: string, 
    iat: number
  }|null>(null)

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
              <Route path="/editchallenge/:challengeId" element={<EditChallenge />}/>
              <Route path="/solve/:challengeId" element={<SolveChallenge />}/>
              <Route path="/profile" element={<UserProfile />}/>
              {(user.role==='admin')?
                <Route path="/admin" element={<AdminPage/>}>
                  <Route path="/admin/challenges" element={<AdminAllChallenges/>}/>
                  <Route path="/admin" element={<AdminDashboard/>}/>
                  <Route path="/admin/requests" element={<AdminPendingRequests/>}/>
                </Route>:null
              }
              <Route path="/challenge/:challengeId" element={<ChallengeStats/>}/>
              <Route path="/admin/review/create/:requestId" element={<PreviewCreateChallengeRequest/>}/>
              <Route path="/admin/review/update/:requestId" element={<PreviewUpdateChallengeRequest/>}/>
              <Route path="/admin/review/delete/:requestId" element={<PreviewDeleteChallengeRequest/>}/>
            </Routes>:<>
            <Routes>
              <Route path="/auth/:page" element={<Auth />}/>
            </Routes>
          </>
          }
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </UserContext.Provider>
    </div>
  );
}

export default App;
