import { IoIosMan } from 'react-icons/io';
import {fetchedDataType} from '../../AdminPage/ModerateChallenges/ReviewRequestInterfaces'
import {BiDotsHorizontalRounded} from 'react-icons/bi'
import {BsLink45Deg} from 'react-icons/bs'
import {MdOutlineEdit, MdDeleteOutline} from 'react-icons/md'
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteChallengeMessageModal from '../../Modals/DeleteChallengeMessageModal';
import { axios } from '../../../Api/eurytusInstance';

const UserChallengeListItem = ({listItem, reloadData}: {listItem: fetchedDataType, reloadData: ()=>void}) => {

    const [showMenu, toggleShowMenu] = useState(false)
    const menuRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const navigate = useNavigate();
    const [showDeleteModal, toggleDeleteModal] = useState(false);
    const [message, setMessage] = useState('');

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
        const url = `http://eurytus.com:3000/solve/${listItem.id}`;
        const el = document.createElement('textarea');
        el.value = url;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    const deleteChallenge = () => {
        axios.put(`/challenges/delete/${listItem.id}`,{
            message: message
        }).then((res)=>{toggleDeleteModal(false); reloadData()})
    }

    return(
        <div className="w-full bg-white h-40 rounded-md shadow p-5 flex flex-col justify-between relative z-0">
            <DeleteChallengeMessageModal message={message} setMessage={(val)=>setMessage(val)} show={showDeleteModal} toggleShow={()=>toggleDeleteModal(false)} deleteChallenge={()=>deleteChallenge()}/>
            <div>
                {showMenu?<div className='z-10 absolute w-44 h-24 rounded shadow right-0 -top-20 bg-white overflow-hidden' ref={menuRef}>
                    <button className='h-1/3 w-full hover:bg-gray-100 flex items-center p-3'  onClick={copyChallengeUrl}> <BsLink45Deg className='mr-2'/> Copy link </button>
                    <button className='h-1/3 w-full hover:bg-gray-100 flex items-center p-3' onClick={()=>navigate(`/editchallenge/${listItem.id}`)}> <MdOutlineEdit className='mr-2'/> Edit </button>
                    <button className='h-1/3 w-full hover:bg-gray-100 flex items-center p-3' onClick={listItem.isPublic? ()=>toggleDeleteModal(true): ()=>deleteChallenge() }> <MdDeleteOutline className='mr-2'/> Delete </button>
                </div>:null}
                <div className="flex justify-between items-center">
                    <h1 className="text-base font-medium text-gray-900 capitalize text-left">{listItem.name}</h1>
                    <button onClick={()=>toggleShowMenu(!showMenu)}><BiDotsHorizontalRounded size={24}/></button>
                </div>
                <p className="text-left mt-1.5 text-base text-gray-600">{listItem.description}</p>
            </div>
            <div className="flex justify-between bottom-0">
                <div>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${(listItem.language==='java')?'text-pink-800 bg-pink-100': 'text-blue-800 bg-blue-100'}`}>
                        {(listItem.language==='java')?'Java':'Javascript'}
                    </span>
                    <span className={`ml-3 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${(listItem.isPublic===true)?'text-green-800 bg-green-100': 'text-yellow-800 bg-yellow-100'}`}>
                        {(listItem.isPublic===true)?'Public':'Private'}
                    </span>
                </div>
                <div className="text-sm text-gray-900 flex justify-center items-center"><IoIosMan/> {100}</div>
            </div>
        </div>
    )
}

export default UserChallengeListItem;