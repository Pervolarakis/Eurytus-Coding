import { NavLink } from "react-router-dom";
import ChallengesTable from "./Tables/ChallengesTable";
import PendingRequestsTable from "./Tables/PendingRequestsTable";
import {MdPendingActions} from 'react-icons/md'
import {HiOutlineDocumentReport} from 'react-icons/hi'
import {AiOutlineFileDone} from 'react-icons/ai'

const AdminDashboard = () => {
    const challenges = [
        {
            id: '1',
            name: 'challenge 1 this is the challnge to be be',
            description: 'Regional Paradigm Technician gffddfd dddd dfdg fdgdgd gfdgd fdgg dfgdre er tetrerte dg df' ,
            isPublic: true,
            language: 'js',
            participants: 103
        },
        {
            id: '2',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician',
            isPublic: false,
            language: 'java',
            participants: 103
        },
        {
            id: '3',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician',
            isPublic: false,
            language: 'js',
            participants: 103
        },
        {
            id: '4',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician',
            isPublic: true,
            language: 'java',
            participants: 103
        }
      ]
    
      const requests = [
        {
            id: '1',
            created_at: '2022-12-11',
            name: 'challenge 1' ,
            kind: 'edit',
            ownerId: '353dgdg533553gf'
        },
        {
            id: '2',
            created_at: '2022-12-11',
            name: 'challenge 1' ,
            kind: 'edit',
            ownerId: '353dgdg533553gf'
        },
        {
            id: '3',
            created_at: '2022-12-11',
            name: 'challenge 1' ,
            kind: 'edit',
            ownerId: '353dgdg533553gf'
        },
        {
            id: '4',
            created_at: '2022-12-11',
            name: 'challenge 1' ,
            kind: 'edit',
            ownerId: '353dgdg533553gf'
        }
    ]


    return(
        <div>
            <div className="flex justify-between gap-16">
                <div className="h-36 w-1/3 bg-white rounded-md shadow p-4 px-7">
                    <div className="flex">
                        <MdPendingActions 
                            size={80}
                            className="text-basicColor1"
                        />
                        <h1 className="flex-grow my-auto text-3xl font-bold">{requests.length}</h1>
                    </div>
                    <h1 className="text-basicColor1 font-bold text-xl text-left ml-3">Pending Requests</h1>
                </div>
                <div className="h-36 w-1/3 bg-white rounded-md shadow p-4 px-7">
                    <div className="flex">
                        <AiOutlineFileDone 
                            size={80}
                            color="#E4587E"
                        />
                        <h1 className="flex-grow my-auto text-3xl font-bold">{challenges.length}</h1>
                    </div>
                    <h1 className="text-basicColor2 font-bold text-xl text-left ml-3">Challenges Completed</h1>
                </div>
                <div className="h-36 w-1/3 bg-white rounded-md shadow p-4 px-7">
                    <div className="flex">
                        <HiOutlineDocumentReport 
                            size={80}
                            className="text-basicColor3"
                        />
                        <h1 className="flex-grow my-auto text-3xl font-bold">{requests.length}</h1>
                    </div>
                    <h1 className="text-basicColor3 font-bold text-xl text-left ml-3">New Challenges</h1>
                </div>         
            </div>
            <div className="flex flex-col">
                <div className="flex justify-between items-center mt-6">
                    <h1 className="text-lg font-semibold">Pending Requests</h1>
                    <NavLink to="/admin/requests" className="text-indigo-600">All Requests</NavLink>
                </div>
                <PendingRequestsTable requests={requests} fixed={true}/>
                {/* Challenges */}
                <div className="flex justify-between items-center mt-6">
                    <h1 className="text-lg font-semibold">Challenges</h1>
                    <NavLink to="/admin/challenges" className="text-indigo-600">All Challenges</NavLink>
                </div>
                <ChallengesTable challenges={challenges} fixed={true}/>
                
            </div>
        </div>
    )
}

export default AdminDashboard;