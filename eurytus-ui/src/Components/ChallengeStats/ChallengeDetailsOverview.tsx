import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { fetchedDataType } from "../AdminPage/ModerateChallenges/ReviewRequestInterfaces";
import Tooltip from "../Tooltip/Tooltip";

const ChallengeDetailsOverview = ({challenge}:{challenge: fetchedDataType}) => {
    const navigate = useNavigate();
    return(
        <div className="w-full">
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
                        <p className="text-basicColor1 font-medium">Total tests: {JSON.parse(challenge.expectedOutputTests)["challenge"].length}</p>
                        <p className="text-basicColor2 font-medium">Required structure: {challenge.expectedStructure? 'true': 'false'}</p>
                        <p className="text-basicColor3 font-medium">Required design patterns: {challenge.expectedDesignPatterns.length}</p>
                    </div>
                    <p className="font-medium">Difficulty: {challenge.difficulty}</p>
                </div>
            </div>
        </div>

    )
}

export default ChallengeDetailsOverview;