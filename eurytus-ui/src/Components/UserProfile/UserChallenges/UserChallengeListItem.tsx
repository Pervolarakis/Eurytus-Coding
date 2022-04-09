import { IoIosMan } from 'react-icons/io';
import {fetchedDataType} from '../../AdminPage/ModerateChallenges/ReviewRequestInterfaces'
import {BiDotsHorizontalRounded} from 'react-icons/bi'
import {BsLink45Deg} from 'react-icons/bs'
import {MdOutlineEdit, MdDeleteOutline} from 'react-icons/md'
import { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import DeleteChallengeMessageModal from '../../Modals/DeleteChallengeMessageModal';
import { axios } from '../../../Api/eurytusInstance';
import { toast } from 'react-toastify';
import ConfirmDeletePrivateModal from '../../Modals/ConfirmDeletePrivateModal';

const UserChallengeListItem = ({listItem, reloadData}: {listItem: fetchedDataType, reloadData: ()=>void}) => {

    const [showMenu, toggleShowMenu] = useState(false)
    const menuRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const navigate = useNavigate();
    const [showDeletePublicModal, toggleDeletePublicModal] = useState(false);
    const [message, setMessage] = useState('');
    const [showDeletePrivateModal, toggleDeletePrivateModal] = useState(false);

    useEffect(()=>{
        const mouseClick = (event: MouseEvent) => {
            if(menuRef.current){
                if(event.target instanceof HTMLElement && !menuRef.current.contains(event.target) ){
                    toggleShowMenu(false)
                }
            }
        }
        document.addEventListener("mousedown", mouseClick)
        return () => document.removeEventListener("mousedown", mouseClick)
    },[])

    const copyChallengeUrl = () => {
        const url = `${window.location.host}/solve/${listItem.id}`;
        const el = document.createElement('textarea');
        el.value = url;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        toast.info('Link copied!')
    }

    const deleteChallenge = () => {
        axios.put(`/challenges/delete/${listItem.id}`,{
            message: message
        }).then((res)=>{
            toast.success((listItem.isPublic)?'Request submitted!':'Challenge deleted!')
            toggleDeletePublicModal(false); 
            toggleDeletePrivateModal(false);
            reloadData();})
        .catch((err)=>{
            toast.error('There was an error deleting this challenge. Please try again later.')
        })
    }

    return(
        <div className="w-full bg-white h-40 rounded-md shadow p-5 flex flex-col justify-between relative z-0">
            <ConfirmDeletePrivateModal show={showDeletePrivateModal} toggleShow={()=>toggleDeletePrivateModal(false)} deleteChallenge={()=>deleteChallenge()}/>
            <DeleteChallengeMessageModal message={message} setMessage={(val)=>setMessage(val)} show={showDeletePublicModal} toggleShow={()=>toggleDeletePublicModal(false)} deleteChallenge={()=>deleteChallenge()}/>
            <div>
                {showMenu?<div className='z-10 absolute w-44 h-24 rounded shadow right-0 -top-20 bg-white overflow-hidden' ref={menuRef}>
                    <button className='h-1/3 w-full hover:bg-gray-100 flex items-center p-3'  onClick={copyChallengeUrl}> <BsLink45Deg className='mr-2'/> Copy link </button>
                    <button className='h-1/3 w-full hover:bg-gray-100 flex items-center p-3' onClick={()=>navigate(`/editchallenge/${listItem.id}`)}> <MdOutlineEdit className='mr-2'/> Edit </button>
                    <button className='h-1/3 w-full hover:bg-gray-100 flex items-center p-3' onClick={listItem.isPublic? ()=>toggleDeletePublicModal(true): ()=>toggleDeletePrivateModal(true) }> <MdDeleteOutline className='mr-2'/> Delete </button>
                </div>:null}
                <div className="flex justify-between items-center">
                    <NavLink to={`/challenge/${listItem.id}`} className="text-base font-medium text-gray-900 capitalize text-left">{listItem.name}</NavLink>
                    <button onClick={()=>toggleShowMenu(!showMenu)}><BiDotsHorizontalRounded size={24}/></button>
                </div>
                <NavLink to={`/challenge/${listItem.id}`}>
                    <p className="text-left mt-1.5 text-base text-gray-600">{listItem.description}</p>
                </NavLink>
            </div>
            <NavLink to={`/challenge/${listItem.id}`}>
                <div className="flex justify-between bottom-0">
                    <div>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${(listItem.language==='java')?'text-pink-800 bg-pink-100': 'text-blue-800 bg-blue-100'}`}>
                            {(listItem.language==='java')?'Java':'Javascript'}
                        </span>
                        <span className={`ml-3 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${(listItem.isPublic===true)?'text-green-800 bg-green-100': 'text-yellow-800 bg-yellow-100'}`}>
                            {(listItem.isPublic===true)?'Public':'Private'}
                        </span>
                    </div>
                    <div className="text-sm text-gray-900 flex justify-center items-center"><IoIosMan/> {listItem.participants}</div>
                </div>
            </NavLink>
        </div>
    )
}

export default UserChallengeListItem;