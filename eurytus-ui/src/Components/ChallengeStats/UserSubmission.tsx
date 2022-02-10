import { BiError } from "react-icons/bi";
import { IoMdDownload } from "react-icons/io";
import { axios } from "../../Api/eurytusInstance";
import Tooltip from "../Tooltip/Tooltip";
import { userHistoryProps } from "../UserProfile/UserHistory/UserHistoryListItem";

const UserSubmission = ({submissionData}:{submissionData: userHistoryProps}) => {

    const getUserCode = () => {
        axios.post('/compile/getcode', {fileRoute: submissionData.saveFileId})
            .then((response) => {
                var link = document.createElement("a");
                link.href = window.URL.createObjectURL(
                new Blob([response.data], { type: "application/octet-stream" })
                );
                link.download = `${submissionData._id}.${submissionData.language}`;
            
                document.body.appendChild(link);
            
                link.click();
            })
            .catch((err)=>console.log(err))
    }

    return(
        <div className="w-full md:h-16 bg-white rounded shadow flex md:items-center md:px-10 p-5 md:justify-between flex-col md:flex-row">
            <h1 className="font-semibold w-1/6 text-left">{submissionData.userEmail}</h1>
            {submissionData.running?<div className="flex md:gap-6 md:w-4/6 md:justify-center md:items-center flex-col md:flex-row">
                <div className="md:block flex">
                    <h1 className="md:text-xl md:font-bold text-basicColor1">{submissionData.outputTestsPassedScore}%</h1>
                    <h1 className="md:text-lg md:font-bold text-basicColor1 ml-2 md:ml-0">Output tests</h1>
                </div>
                {submissionData.requiredStructureFound!==null?<div className="md:block flex">
                    <h1 className="md:text-xl md:font-bold text-basicColor2">{submissionData.requiredStructureFound? 'Structure found': 'Structure not found'}</h1>
                </div>:null}
                {
                    submissionData.designPatternsFound!==null?
                    <Tooltip tooltipText={JSON.stringify(submissionData.designPatternsFound)}>
                    <div className="md:w-full md:block flex">
                        <h1 className="md:text-xl md:font-bold text-basicColor3">{Object.values(submissionData.designPatternsFound).reduce((a, item) => a + (item?1:0), 0)}</h1>
                        <h1 className="md:text-lg md:font-bold text-basicColor3 ml-2 md:ml-0">Design patterns</h1>
                    </div></Tooltip>:null
                }
            </div>:<div className="md:w-1/3 md:block flex items-center">
                    <div className="md:text-3xl md:font-bold text-red-500 flex justify-center items-center"><BiError size={30}/></div>
                    <h1 className="md:text-xl md:font-bold text-red-500 ml-2 md:ml-0">Not Running</h1>
                </div>}
            <button className="hidden w-9 h-9 rounded-full bg-gray-300 md:flex justify-center items-center" onClick={()=>getUserCode()}><IoMdDownload size={24}/></button>
        </div>
    )
}

export default UserSubmission;