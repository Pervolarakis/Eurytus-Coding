import { useState } from "react";
import { BsLink45Deg } from "react-icons/bs";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axios } from "../../Api/eurytusInstance";
import { fetchedDataType } from "../AdminPage/ModerateChallenges/ReviewRequestInterfaces";
import ConfirmDeletePrivateModal from "../Modals/ConfirmDeletePrivateModal";
import DeleteChallengeMessageModal from "../Modals/DeleteChallengeMessageModal";
import Tooltip from "../Tooltip/Tooltip";

const ChallengeDetailsOverview = ({challenge}:{challenge: fetchedDataType}) => {

    const navigate = useNavigate();
    // const [showDeletePublicModal, toggleDeletePublicModal] = useState(false);
    const [message, setMessage] = useState('');
    // const [showDeletePrivateModal, toggleDeletePrivateModal] = useState(false);

    const copyChallengeUrl = () => {
        const url = `http://eurytus.com:3000/solve/${challenge.id}`;
        const el = document.createElement('textarea');
        el.value = url;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        toast.info('Link copied!')
    }

    // const deleteChallenge = () => {
    //     axios.put(`/challenges/delete/${challenge.id}`,{
    //         message: message
    //     }).then((res)=>{
    //         toast.success((challenge.isPublic)?'Request submitted!':'Challenge deleted!')
    //         toggleDeletePublicModal(false); 
    //         toggleDeletePrivateModal(false);   
    //         if(!challenge.isPublic){
    //             navigate('/profile')
    //         } 
    //     })
    //     .catch((err)=>{
    //         console.log(err.response.data)
    //         toast.error('There was an error deleting this challenge. Please try again later.')
    //     })
    // }

    return(
        <div className="w-full">
            {/* <ConfirmDeletePrivateModal show={showDeletePrivateModal} toggleShow={()=>toggleDeletePrivateModal(false)} deleteChallenge={()=>deleteChallenge()}/> */}
            {/* <DeleteChallengeMessageModal message={message} setMessage={(val)=>setMessage(val)} show={showDeletePublicModal} toggleShow={()=>toggleDeletePublicModal(false)} deleteChallenge={()=>deleteChallenge()}/> */}
            <div className="mt-8 mb-4 w-full flex items-center justify-between">
                <h1 className="text-left text-md font-medium">{challenge.name}</h1>
                <div className="flex gap-4">
                    <Tooltip tooltipText="Edit">
                        <button onClick={()=>navigate(`/editchallenge/${challenge.id}`)} className="w-8 h-8 bg-white rounded-full flex justify-center"><MdOutlineEdit className='m-auto'/></button>
                    </Tooltip>
                    {/* <Tooltip tooltipText="Delete">
                        <button className="w-8 h-8 bg-white rounded-full flex justify-center" onClick={challenge.isPublic? ()=>toggleDeletePublicModal(true): ()=>toggleDeletePrivateModal(true) }><MdDeleteOutline className='m-auto'/></button>
                    </Tooltip> */}
                    <Tooltip tooltipText="Copy link">
                        <button className="w-8 h-8 bg-white rounded-full flex justify-center" onClick={copyChallengeUrl}><BsLink45Deg className='m-auto'/></button>
                    </Tooltip>
                </div>
            </div>
            <div className="w-full md:max-h-44 max-h-64 bg-white rounded shadow p-5 flex flex-col justify-between">
                <p className="text-left text-base font-medium text-gray-600 max-h-24 md:max-h-full overflow-y-scroll">{challenge.description}</p>
                <div className="flex justify-between items-center">
                    <div className="flex md:gap-4 mt-1 flex-col md:flex-row items-start">
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