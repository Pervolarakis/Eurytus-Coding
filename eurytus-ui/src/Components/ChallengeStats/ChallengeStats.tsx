import { useEffect, useState } from "react";
import { IoIosMan } from "react-icons/io";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import {BiError} from 'react-icons/bi'
import { useNavigate, useParams } from "react-router-dom";
import { axios } from "../../Api/eurytusInstance";
import { fetchedDataType } from "../AdminPage/ModerateChallenges/ReviewRequestInterfaces";
import Tooltip from "../Tooltip/Tooltip";
import { userHistoryProps } from "../UserProfile/UserHistory/UserHistoryListItem";
import Gauge from 'react-svg-gauge';

const ChallengeStats = () => {
    
    const {challengeId} = useParams();
    const [challengeHistory, setChallengeHistory] = useState<userHistoryProps[]>([])
    const [challenge, setChallenge] = useState<fetchedDataType>();
    const [notRunnig,setNotRunning] = useState(0);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`/history/${challengeId}`)
            .then((res)=>setChallengeHistory(res.data.data))
        axios.get(`/challenges/${challengeId}`)
            .then((res)=>setChallenge(res.data.data));
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
                    <div className="mt-8 mb-4 w-full flex items-center justify-between">
                        <h1 className="text-left text-md font-medium">{challenge.name}</h1>
                        <div className="flex gap-4">
                            <Tooltip tooltipText="Edit">
                                <button onClick={()=>navigate(`/editchallenge/${challenge.id}`)} className="w-8 h-8 bg-white rounded-full flex justify-center"><MdOutlineEdit className='m-auto'/></button>
                            </Tooltip>
                            <Tooltip tooltipText="Delete">
                                <button className="w-8 h-8 bg-white rounded-full flex justify-center"><MdDeleteOutline className='m-auto'/></button>
                            </Tooltip>
                        </div>
                    </div>
                    <div className="w-full h-44 bg-white rounded shadow p-5 flex flex-col justify-between">
                        <p className="text-left text-base text-gray-600 max-h-24 md:max-h-full overflow-hidden">{challenge.description}</p>
                        <div className="flex justify-between">
                            <div className="flex gap-4">
                                <p className="text-basicColor1">Total tests: {JSON.parse(challenge.expectedOutputTests)["challenge"].length}</p>
                                <p className="text-basicColor2">Required structure: {challenge.expectedStructure? 'true': 'false'}</p>
                                <p className="text-basicColor3">Required design patterns: {challenge.expectedDesignPatterns.length}</p>
                            </div>
                            <p>Difficulty: {challenge.difficulty}</p>
                        </div>
                    </div>
                    <h1 className="mt-8 mb-4 w-full text-left text-md font-medium">Overview</h1>
                    <div className="w-full h-24 bg-white rounded shadow p-5 flex justify-around md:px-20">
                        <div>
                            <div className="text-3xl font-bold text-gray-900 flex justify-center items-center"><IoIosMan size={30}/> {challengeHistory.length}</div>
                            <h1 className="text-xl font-bold text-gray-900">Participants</h1>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-basicColor1">{(challengeHistory.reduce((total, next) => total + (next.outputTestsPassedScore!?next.outputTestsPassedScore!:0), 0)/(challengeHistory.length-notRunnig)).toFixed(2)}%</h1>
                            <h1 className="text-xl font-bold text-basicColor1">Avg. Tests</h1>
                        </div>
                        {challenge.expectedStructure?<div>
                            <h1 className="text-3xl font-bold text-basicColor2">{(challengeHistory.reduce((total, next) => total + (next.requiredStructureFound?1:0) , 0)/(challengeHistory.length-notRunnig)).toFixed(2)}%</h1>
                            <h1 className="text-xl font-bold text-basicColor2">Structure</h1>
                        </div>:null}
                        {challenge.expectedDesignPatterns?<div>
                            <h1 className="text-3xl font-bold text-basicColor3">{((challengeHistory.reduce((total, next) => total + (next.designPatternsFound!?Object.values(next.designPatternsFound!).reduce((a, item) => a + (item?1:0), 0):0) , 0))/(challengeHistory.length-notRunnig)).toFixed(2)}</h1>
                            <h1 className="text-xl font-bold text-basicColor3">Avg. Patterns</h1>
                        </div>:null}
                        <div>
                            <div className="text-3xl font-bold text-red-500 flex justify-center items-center"><BiError size={30}/> {notRunnig}</div>
                            <h1 className="text-xl font-bold text-red-500">Not Running</h1>
                        </div>
                    </div>
                    <div className="w-full mt-8 h-48 bg-white rounded shadow p-5 hidden md:flex justify-around">
                        <div>
                            <Gauge value={(Number.parseFloat((challengeHistory.reduce((total, next) => total + (next.outputTestsPassedScore!?next.outputTestsPassedScore!:0), 0)/(challengeHistory.length-notRunnig)).toFixed(2)))} valueLabelStyle={{fontSize: '30px'}}  color={"#6B58E4"} minMaxLabelStyle={{display: 'none'}} width={300} height={150} label="" />
                            <h1 className="text-xl font-bold text-basicColor1 -top-5 relative">Avg. Tests</h1>
                        </div>
                        {challenge.expectedStructure?
                            <div>
                                <Gauge value={(Number.parseFloat((challengeHistory.reduce((total, next) => total + (next.requiredStructureFound?1:0) , 0)/(challengeHistory.length-notRunnig)).toFixed(2)))} valueLabelStyle={{fontSize: '30px'}} minMaxLabelStyle={{display: 'none'}}  color={"#E4587E"} width={300} height={150} label="" />
                                <h1 className="text-xl font-bold text-basicColor2 -top-5 relative">Structure</h1>
                            </div>:null}
                        {challenge.expectedDesignPatterns?
                            <div>
                                <Gauge value={(Number.parseFloat(((challengeHistory.reduce((total, next) => total + (next.designPatternsFound!?Object.values(next.designPatternsFound!).reduce((a, item) => a + (item?1:0), 0):0) , 0))/(challengeHistory.length-notRunnig)).toFixed(2))*100)} minMaxLabelStyle={{display: 'none'}} valueLabelStyle={{fontSize: '30px'}}  color={"#E4D358"} width={300} height={150} label="" />
                                <h1 className="text-xl font-bold text-basicColor3 -top-5 relative">Avg. Patterns</h1>
                            </div>:null}
                    </div>
                </>:null
            }
        </div>
    )
}

export default ChallengeStats;