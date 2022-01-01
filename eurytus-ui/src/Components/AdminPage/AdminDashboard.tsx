import { NavLink } from "react-router-dom";
import ChallengesTable from "./Tables/ChallengesTable";
import PendingRequestsTable from "./Tables/PendingRequestsTable";

const AdminDashboard = () => {
    const challenges = [
        {
            id: '324432432342',
            name: 'challenge 1 this is the challnge to be be',
            description: 'Regional Paradigm Technician gffddfd dddd dfdg fdgdgd gfdgd fdgg dfgdre er tetrerte dg df' ,
            isPublic: true,
            language: 'js',
            participants: 103
        },
        {
            id: '324432222342',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician',
            isPublic: false,
            language: 'java',
            participants: 103
        },
        {
            id: '324432ssd222342',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician',
            isPublic: false,
            language: 'js',
            participants: 103
        },
        {
            id: '324432ffff222342',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician',
            isPublic: true,
            language: 'java',
            participants: 103
        }
      ]
    
      const requests = [
        {
            id: '324432432342',
            created_at: '2022-12-11',
            name: 'challenge 1' ,
            kind: 'edit',
            ownerId: '353dgdg533553gf'
        },
        {
            id: '324432432342',
            created_at: '2022-12-11',
            name: 'challenge 1' ,
            kind: 'edit',
            ownerId: '353dgdg533553gf'
        },
        {
            id: '324432432342',
            created_at: '2022-12-11',
            name: 'challenge 1' ,
            kind: 'edit',
            ownerId: '353dgdg533553gf'
        },
        {
            id: '324432432342',
            created_at: '2022-12-11',
            name: 'challenge 1' ,
            kind: 'edit',
            ownerId: '353dgdg533553gf'
        }
    ]


    return(
        <div>
            <div className="flex justify-between">
                <div className="h-36 w-1/4 bg-white rounded-md shadow">
                    <h1>Pending Requests</h1>
                </div>
                <div className="h-36 w-1/4 bg-white rounded-md shadow">
                    <h1>Challenges Completed</h1>
                </div>
                <div className="h-36 w-1/4 bg-white rounded-md shadow">
                    <h1>Pending Requests</h1>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="flex justify-between items-center mt-6">
                    <h1 className="text-lg font-semibold">Pending Requests</h1>
                    <NavLink to="/admin/requests" className="text-indigo-600">All Requests</NavLink>
                </div>
                <PendingRequestsTable requests={requests}/>
                {/* Challenges */}
                <div className="flex justify-between items-center mt-6">
                    <h1 className="text-lg font-semibold">Challenges</h1>
                    <NavLink to="/admin/requests" className="text-indigo-600">All Challenges</NavLink>
                </div>
                <ChallengesTable challenges={challenges}/>
                
            </div>
        </div>
    )
}

export default AdminDashboard;