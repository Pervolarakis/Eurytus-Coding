import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axios } from "../../Api/eurytusInstance";
import { fetchedDataType } from "../AdminPage/ModerateChallenges/ReviewRequestInterfaces";
import { userHistoryProps } from "../UserProfile/UserHistory/UserHistoryListItem";
import UserSubmission from "./UserSubmission";
import ChallengeDetailsOverview from "./ChallengeDetailsOverview";
import ChallengeStatsOverview from "./ChallengeStatsOverview";
import { toast } from "react-toastify";

const ChallengeStats = () => {
    
    const {challengeId} = useParams();
    const [challengeHistory, setChallengeHistory] = useState<userHistoryProps[]>([])
    const [challenge, setChallenge] = useState<fetchedDataType>();
    const [notRunning,setNotRunning] = useState(0);

    useEffect(()=>{
        axios.get(`/history/${challengeId}`)
            .then((res)=>setChallengeHistory(res.data.data))
            .catch(err=>toast.error(err.response?.data.error||'There was an error fetching challenge history!'))
        axios.get(`/challenges/${challengeId}`)
            .then((res)=>setChallenge(res.data.data))
            .catch(err=>toast.error(err.response?.data.error||'There was an error fetching challenge!'))
    },[challengeId])

    useEffect(()=>{
        if(challengeHistory){
            const notRunningTemp = challengeHistory.reduce((total, next) => total + (next.running!?0:1), 0)
            setNotRunning(notRunningTemp);
        }
    },[challengeHistory])

    return(
        <div className="responsive-container items-center">
            {(challengeHistory && challenge)?
                <>
                    <ChallengeDetailsOverview challenge={challenge}/>
                    <ChallengeStatsOverview challengeHistory={challengeHistory} challenge={challenge} notRunning={notRunning}/>
                    <h1 className="mt-8 mb-4 w-full text-left text-md font-medium">Students</h1>
                    <div className="w-full flex flex-col gap-3">
                        {
                            challengeHistory.map((el,index)=>{
                                return <UserSubmission  submissionData={el}/>
                            })
                        }
                    </div>
                </>:null
            }
        </div>
    )
}

export default ChallengeStats;