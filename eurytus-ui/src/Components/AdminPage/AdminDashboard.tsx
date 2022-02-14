import { NavLink } from "react-router-dom";
import ChallengesTable from "./Tables/ChallengesTable";
import PendingRequestsTable from "./Tables/PendingRequestsTable";
import {MdPendingActions} from 'react-icons/md'
import {HiOutlineDocumentReport} from 'react-icons/hi'
import {AiOutlineFileDone} from 'react-icons/ai'
import { RequestsContext } from "../../Contexts/RequestsContext";
import { useContext } from "react";
import { ChallengesContext } from "../../Contexts/ChallengesContext";

const AdminDashboard = () => {
    
    const {requests} = useContext(RequestsContext)
    const {challenges} = useContext(ChallengesContext)

    return(
        <div>
            <div className="flex flex-col justify-between gap-4 md:flex-row md:gap-16">
                <div className="h-36 md:w-1/3 bg-white rounded-md shadow p-4 px-7">
                    <div className="flex">
                        <MdPendingActions 
                            size={80}
                            className="text-basicColor1"
                        />
                        <h1 className="flex-grow my-auto text-3xl font-bold">{(requests)?requests.length:'-'}</h1>
                    </div>
                    <h1 className="text-basicColor1 font-bold text-xl text-left ml-3">Pending Requests</h1>
                </div>
                <div className="h-36 md:w-1/3 bg-white rounded-md shadow p-4 px-7">
                    <div className="flex">
                        <AiOutlineFileDone 
                            size={80}
                            color="#E4587E"
                        />
                        <h1 className="flex-grow my-auto text-3xl font-bold">{(challenges)?challenges.length:'-'}</h1>
                    </div>
                    <h1 className="text-basicColor2 font-bold text-xl text-left ml-3">Challenges Completed</h1>
                </div>
                <div className="h-36 md:w-1/3 bg-white rounded-md shadow p-4 px-7">
                    <div className="flex">
                        <HiOutlineDocumentReport 
                            size={80}
                            className="text-basicColor3"
                        />
                        <h1 className="flex-grow my-auto text-3xl font-bold">{(requests)?requests.length:'-'}</h1>
                    </div>
                    <h1 className="text-basicColor3 font-bold text-xl text-left ml-3">New Challenges</h1>
                </div>         
            </div>
            <div className="flex flex-col">
                <div className="flex justify-between items-center mt-6">
                    <h1 className="text-lg font-semibold">Pending Requests</h1>
                    <NavLink to="/admin/requests" className="text-indigo-600">All Requests</NavLink>
                </div>
                {requests?<PendingRequestsTable requests={requests.slice(0,4)} fixed={true}/>:'No Pending Requests'}
                {/* Challenges */}
                <div className="flex justify-between items-center mt-6">
                    <h1 className="text-lg font-semibold">Challenges</h1>
                    <NavLink to="/admin/challenges" className="text-indigo-600">All Challenges</NavLink>
                </div>
                {challenges?<ChallengesTable challenges={challenges.slice(0,4)} fixed={true}/>:'No Challenges yet'}
                
            </div>
        </div>
    )
}

export default AdminDashboard;