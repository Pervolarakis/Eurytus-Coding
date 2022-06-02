import { useEffect, useState } from "react";
import { BiError } from "react-icons/bi";
import { toast } from "react-toastify";
import { axios } from "../../../Api/eurytusInstance";
import { fetchedDataType } from "../../AdminPage/ModerateChallenges/ReviewRequestInterfaces";
import Tooltip from "../../Tooltip/Tooltip";

export interface userHistoryProps {
    _id: string,
    challengeId: string,
    completionDate: string,
    language: string,
    outputTestsPassedScore: number | null,
    requiredStructureFound: boolean | null,
    running: boolean,
    saveFileId?: string
    userEmail?: string
    userId?: string
    designPatternsFound: {
        singleton?: boolean,
        factory?: boolean,
        observer?: boolean
    } | null,
}

const UserHistoryListItem = ({challengeId, completionDate, language, outputTestsPassedScore, requiredStructureFound, running, designPatternsFound}: userHistoryProps) => {

    const [challenge, setChallenge] = useState<fetchedDataType>();
    const [percentageOfDpsFound, setPercentageOfDpsFound] = useState<number|null>(null)

    useEffect(()=>{
        axios.get(`/challenges/${challengeId}`)
            .then((res)=>setChallenge(res.data.data))
            .catch(err=>toast.error(err.response?.data.error||'There was an error fetching challenge!'))
            if(designPatternsFound!==null){
                setPercentageOfDpsFound(Object.values(designPatternsFound).reduce((a, item) => a + (item?1:0), 0)/Object.keys(designPatternsFound).length)
            }
    },[])

    return (
        <div className="w-full bg-white h-44 rounded-md shadow p-5 px-6 flex flex-col justify-between relative z-10 items-start">
            {challenge?
            <>
            <h1 className="text-base font-medium text-gray-900 capitalize text-left">{challenge!.name}</h1>
            <div className="w-full h-full flex mt-1.5 gap-3">
                <div className="w-4/6 flex flex-col justify-between">
                    <p className="text-left text-base text-gray-600 max-h-24 md:max-h-full overflow-hidden">{challenge.description.slice(0,150)}</p>
                    <p className="text-left text-xs text-gray-600">Completed: {new Date(completionDate).toLocaleString()}</p>
                </div>
                {running?<div className="w-2/6">
                    {outputTestsPassedScore!==null?
                        <Tooltip tooltipText={`${outputTestsPassedScore!.toString()}%`}>
                        <>
                            <p className="text-sm text-left text-gray-800">Score</p>
                            <div className={`h-3 rounded border border-gray-300 overflow-hidden`}>
                                <div className={`h-full ${Math.floor(outputTestsPassedScore!/20)===0? 'w-0': Math.floor(outputTestsPassedScore!/20)===1? 'w-1/5': Math.floor(outputTestsPassedScore!/20)===2? 'w-2/5': Math.floor(outputTestsPassedScore!/20)===3? 'w-3/5': Math.floor(outputTestsPassedScore!/20)===4? 'w-4/5': 'w-5/5'} bg-basicColor1`}></div>
                            </div>
                        </>
                    </Tooltip>:null}
                
                    {
                        requiredStructureFound!==null?
                        <Tooltip tooltipText={requiredStructureFound!.toString()}>
                            <>
                            <p className="text-sm text-left text-gray-800">Structure</p>
                            <div className={`h-3 rounded border border-gray-300 overflow-hidden`}>
                                <div className={`h-full ${requiredStructureFound?'w-full':'w-0'} bg-basicColor2`}></div>
                            </div>
                            </>
                        </Tooltip>:null
                    }
                    {
                        percentageOfDpsFound!==null?
                        <Tooltip tooltipText={`${Object.values(designPatternsFound!).reduce((a, item) => a + (item?1:0), 0)}/${Object.keys(designPatternsFound!).length}`}>
                            <>
                                <p className="text-sm text-left text-gray-800">Design Patterns</p>
                                <div className={`h-3 rounded border border-gray-300 overflow-hidden`}>
                                    <div className={`h-full ${Math.floor(percentageOfDpsFound!*6)===0? 'w-0': Math.floor(percentageOfDpsFound!*6)===1? 'w-1/6': Math.floor(percentageOfDpsFound!*6)===2? 'w-2/6': Math.floor(percentageOfDpsFound!*6)===3? 'w-3/6': Math.floor(percentageOfDpsFound!*6)===4? 'w-4/6': Math.floor(percentageOfDpsFound!*6)===5? 'w-5/6': 'w-full'} bg-basicColor3`}></div>
                                </div>
                            </>
                        </Tooltip>:null
                    }
                </div>:
                <div>
                    <div className="text-3xl font-bold text-red-500 flex justify-center items-center"><BiError size={30}/></div>
                    <h1 className="text-xl font-bold text-red-500">Not Running</h1>
                </div>}
            </div></>:<h1>Loading</h1>}
        </div>
    )
}

export default UserHistoryListItem;