import { BiError } from "react-icons/bi";
import { IoMdDownload } from "react-icons/io";
import Tooltip from "../Tooltip/Tooltip";
import { userHistoryProps } from "../UserProfile/UserHistory/UserHistoryListItem";

const UserSubmission = ({submissionData}:{submissionData: userHistoryProps}) => {
    return(
        <div className="w-full h-16 bg-white rounded shadow flex items-center px-10 justify-between">
            <h1 className="font-semibold">{submissionData.userEmail}</h1>
            {submissionData.running?<div className="flex gap-6">
                <div>
                    <h1 className="text-xl font-bold text-basicColor1">{submissionData.outputTestsPassedScore}%</h1>
                    <h1 className="text-lg font-bold text-basicColor1">Output tests</h1>
                </div>
                {submissionData.requiredStructureFound!==null?<div>
                    <h1 className="text-xl font-bold text-basicColor2">{submissionData.requiredStructureFound? 'Structure found': 'Structure not found'}</h1>
                </div>:null}
                {
                    submissionData.designPatternsFound!==null?
                    <Tooltip tooltipText={JSON.stringify(submissionData.designPatternsFound)}>
                    <div>
                        <h1 className="text-xl font-bold text-basicColor3">{Object.values(submissionData.designPatternsFound).reduce((a, item) => a + (item?1:0), 0)}</h1>
                        <h1 className="text-lg font-bold text-basicColor3">Design patterns</h1>
                    </div></Tooltip>:null
                }
            </div>:<div>
                    <div className="text-3xl font-bold text-red-500 flex justify-center items-center"><BiError size={30}/></div>
                    <h1 className="text-xl font-bold text-red-500">Not Running</h1>
                </div>}
            <button className="w-9 h-9 rounded-full bg-gray-300 flex justify-center items-center"><IoMdDownload size={24}/></button>
        </div>
    )
}

export default UserSubmission;