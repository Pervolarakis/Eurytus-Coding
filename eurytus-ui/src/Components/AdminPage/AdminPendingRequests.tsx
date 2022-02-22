import { useContext } from "react";
import { RequestsContext } from "../../Contexts/RequestsContext";
import PendingRequestsTable from "./Tables/PendingRequestsTable";

const AdminPendingRequests = () => {
    
    const {requests, setRequests} = useContext(RequestsContext)
    
    return(
        <div className="h-full">
            <h1 className="text-left font-semibold text-xl mb-4">All Requests</h1>
            {requests?<PendingRequestsTable requests={requests}/>:'No Pending Requests'}
        </div>
    )
}

export default AdminPendingRequests;