import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axios } from "../../Api/eurytusInstance";
import { UserContext } from "../../Contexts/UserContext";
import { getUserAvatar } from "../../Utils/getUserAvatar";
import { fetchedDataType } from "../AdminPage/ModerateChallenges/ReviewRequestInterfaces";
import PendingRequestsTable from "../AdminPage/Tables/PendingRequestsTable";
import CancelRequestModal from "../Modals/CancelRequestModal";
import UserChallengeListItem from "./UserChallenges/UserChallengeListItem";
import UserHistoryListItem, { userHistoryProps } from "./UserHistory/UserHistoryListItem";

export interface particiants{
    _id: string,
    count: number
}

const UserProfile = () => {

    const {user} = useContext(UserContext);
    const [userChallenges, setUserChallenges] = useState<fetchedDataType[]>([])
    const [userRequests, setUserRequests] = useState([])
    const [requestToDelete, setRequestToDelete] = useState('')
    const [history, setHistory] = useState<userHistoryProps[]>([]);
    const [participants, setParticipants] = useState<particiants[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetchUserData()
    },[])

    const fetchUserData = () => {
        axios.get('/moderate/myrequests')
            .then((res)=>{setUserRequests(res.data.data)})
            .catch(err=>toast.error(err.response?.data.error||'There was an error fetching requests!'))
        axios.get('/challenges/myChallenges')
            .then((res)=>{setUserChallenges(res.data.data);setLoaded(true)})
            .catch(err=>toast.error(err.response?.data.error||'There was an error fetching challenges!'))
        axios.get('/history/user')
            .then((res)=>setHistory(res.data.data))
            .catch(err=>toast.error(err.response?.data.error||'There was an error fetching user history!'))
        axios.get('/history/getuserparticipants')
            .then((res)=>setParticipants(res.data.data))
            .catch(err=>toast.error(err.response?.data.error||'There was an error fetching participants!'))
    }

    const deleteRequest = () => {
        axios.delete(`/moderate/cancel/${requestToDelete}`)
            .then((res)=>{
                setRequestToDelete('');
                fetchUserData();
                toast.success('Request Deleted!')
            })
            .catch((err)=>{
                toast.error('There was an error deleting that request. Please try again later!')
            })
    }

    useEffect(()=>{
        if(participants.length&&userChallenges.length&&loaded){
            let userChallengesTemp = [...userChallenges];
            userChallengesTemp = userChallengesTemp.map(obj=> ({ ...obj, participants: (participants.find(entry => entry._id === obj.id)!==undefined)?participants.find(entry => entry._id === obj.id)!["count"]:0}))
            setUserChallenges(userChallengesTemp);
            setLoaded(false);
        }
    },[participants, loaded])

    return (
        <div className="responsive-container items-center">
            <CancelRequestModal show={requestToDelete.length>0} toggleShow={()=>setRequestToDelete('')} deleteRequest={()=>deleteRequest()}/>
            <div className="w-full md:w-10/12 h-36 bg-white mt-12 rounded-md shadow overflow-hidden relative">
                <div className="h-full w-full" id="trapezoid">
                    <div className="absolute flex w-full h-full items-center ml-5 md:ml-28 ">
                        <div className="w-24 h-24 rounded-full bg-white">
                            <img alt="user pic" src={getUserAvatar(user!.id)}></img>
                        </div>
                        <div className="ml-10">
                            <h1 className="text-lg font-normal">{user?.email}</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-start w-full md:w-10/12 flex-col">
                <h1 className="my-8 text-left text-md font-medium">My recent grades</h1>
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
                            return <UserChallengeListItem reloadData={()=>fetchUserData()} key={el.id+index} listItem={el}/>
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