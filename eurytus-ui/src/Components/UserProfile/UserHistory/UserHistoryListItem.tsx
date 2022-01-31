import { useEffect, useState } from "react";
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
    designPatternsFound: {
        singleton?: boolean,
        factory?: boolean,
        observer?: boolean
    } | null,
}

const UserHistoryListItem = ({challengeId, completionDate, language, outputTestsPassedScore, requiredStructureFound, running, designPatternsFound}: userHistoryProps) => {

    const [challenge, setChallenge] = useState<fetchedDataType>();

    useEffect(()=>{
        axios.get(`/challenges/${challengeId}`)
            .then((res)=>setChallenge(res.data.data));
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
                <div className="w-2/6">
                    <Tooltip tooltipText={`${outputTestsPassedScore!.toString()}%`}>
                        <>
                            <p className="text-sm text-left text-gray-800">Score</p>
                            <div className={`h-3 rounded border border-gray-300 overflow-hidden`}>
                                <div className={`h-full w-${Math.floor(outputTestsPassedScore!/20)}/5 bg-basicColor1`}></div>
                            </div>
                        </>
                    </Tooltip>
                    {
                        requiredStructureFound!==null?
                        <Tooltip tooltipText={requiredStructureFound!.toString()}>
                            <>
                            <p className="text-sm text-left text-gray-800">Structure</p>
                            <div className={`h-3 rounded border border-gray-300 overflow-hidden`}>
                                <div className={`h-full w-${requiredStructureFound?'full':'0'} bg-basicColor2`}></div>
                            </div>
                            </>
                        </Tooltip>:null
                    }
                    {
                        designPatternsFound!==null?
                        <Tooltip tooltipText={`${Object.values(designPatternsFound).reduce((a, item) => a + (item?1:0), 0)}/${Object.keys(designPatternsFound).length}`}>
                            <>
                                <p className="text-sm text-left text-gray-800">Design Patterns</p>
                                <div className={`h-3 rounded border border-gray-300 overflow-hidden`}>
                                    <div className={`h-full w-${Object.values(designPatternsFound).reduce((a, item) => a + (item?1:0), 0)}/${Object.keys(designPatternsFound).length} bg-basicColor3`}></div>
                                </div>
                            </>
                        </Tooltip>:null
                    }
                </div>
            </div></>:<h1>Loading</h1>}
        </div>
    )
}

export default UserHistoryListItem;