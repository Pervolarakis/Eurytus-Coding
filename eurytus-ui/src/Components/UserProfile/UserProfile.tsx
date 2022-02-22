import { useContext, useEffect, useState } from "react";
import { axios } from "../../Api/eurytusInstance";
import { UserContext } from "../../Contexts/UserContext";
import { getUserAvatar } from "../../Utils/getUserAvatar";
import PendingRequestsTable from "../AdminPage/Tables/PendingRequestsTable";
import CancelRequestModal from "../Modals/CancelRequestModal";
import UserChallengeListItem from "./UserChallenges/UserChallengeListItem";
import UserHistoryListItem, { userHistoryProps } from "./UserHistory/UserHistoryListItem";

const UserProfile = () => {

    const {user, setUser} = useContext(UserContext);
    const [userChallenges, setUserChallenges] = useState([])
    const [userRequests, setUserRequests] = useState([])
    const [requestToDelete, setRequestToDelete] = useState('')
    const [history, setHistory] = useState<userHistoryProps[]>([]);

    useEffect(() => {
        fetchUserData()
    },[])

    const fetchUserData = () => {
        axios.get('/moderate/myrequests')
            .then((res)=>{setUserRequests(res.data.data)})
        axios.get('/challenges/myChallenges')
            .then((res)=>setUserChallenges(res.data.data))
        axios.get('/history/user')
            .then((res)=>setHistory(res.data.data))
    }

    const deleteRequest = () => {
        axios.delete(`/moderate/cancel/${requestToDelete}`)
            .then((res)=>{setRequestToDelete('');fetchUserData()})
    }

    return (
        <div className="responsive-container items-center">
            <CancelRequestModal show={requestToDelete.length>0} toggleShow={()=>setRequestToDelete('')} deleteRequest={()=>deleteRequest()}/>
            <div className="w-full md:w-10/12 h-36 bg-white mt-12 rounded-md shadow overflow-hidden relative">
                <div className="h-full w-full" id="trapezoid">
                    <div className="absolute flex w-full h-full items-center ml-5 md:ml-28 ">
                        <div className="w-24 h-24 rounded-full bg-white">
                            <img src={getUserAvatar(user!.id)}></img>
                        </div>
                        <div className="ml-10">
                            <h1 className="text-lg font-normal">{user?.email}</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-start w-full md:w-10/12 flex-col">
                <h1 className="my-8 text-left text-md font-medium">Recent Exams</h1>
                <div className="flex flex-col md:grid md:grid-cols-2 gap-6">
                    {history?
                        history.map((el, index)=>{
                            return <UserHistoryListItem key={el._id} _id={el._id} challengeId={el.challengeId} completionDate={el.completionDate} language={el.language} outputTestsPassedScore={el.outputTestsPassedScore} designPatternsFound={el.designPatternsFound} requiredStructureFound={el.requiredStructureFound} running={el.running}/>
                        }):<h1>You haven't completed any challenges yet!</h1>
                    }
                </div>
            </div>
            <div className="flex justify-start w-full md:w-10/12 flex-col">
                <h1 className="my-8 text-left text-md font-medium">My Challenges</h1>
                <div className="flex flex-col md:grid md:grid-cols-2 gap-6">
                    {userChallenges?
                        userChallenges.map((el,index)=>{
                            return <UserChallengeListItem reloadData={()=>fetchUserData()} key={el+index} listItem={el}/>
                        }):<h1>You dont own any challenges yet!</h1>
                    }
                </div>
            </div>
            <div className="flex justify-start w-full md:w-10/12 flex-col h-96">
                <h1 className="mt-8 mb-6 text-left text-md font-medium">Pending Requests</h1>
                {userRequests.length?<PendingRequestsTable requests={userRequests} userProfile={(id:string)=>setRequestToDelete(id)}/>:<h1>No pending request yet!</h1>}
            </div>
        </div>
    )
}

export default UserProfile;