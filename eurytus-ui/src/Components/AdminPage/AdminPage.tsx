import {axios} from '../../Api/eurytusInstance';
import { useEffect, useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { ChallengesContext } from '../../Contexts/ChallengesContext';
import { RequestsContext } from '../../Contexts/RequestsContext';
import { Disclosure } from '@headlessui/react';
import {FaAngleUp, FaAngleDown} from 'react-icons/fa'
import { particiants } from '../UserProfile/UserProfile';
import { fetchedDataType } from './ModerateChallenges/ReviewRequestInterfaces';

const AdminPage = () => {
    
    const [requests,setRequests] = useState(null);
    const [challenges,setChallenges] = useState<fetchedDataType[]>([]);
    const [participants, setParticipants] = useState<particiants[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{
        axios.get('/moderate/requests')
            .then((res)=>setRequests(res.data.data||null))
            .catch(err=>console.log(err))
        axios.get('/challenges/')
            .then((res)=>{setChallenges(res.data.data||null);setLoaded(true)})
        axios.get('/history/getallparticipants')
            .then((res)=>setParticipants(res.data.data))
    },[])

    useEffect(()=>{
        if(loaded && participants.length && challenges.length){
            let userChallengesTemp = [...challenges];
            userChallengesTemp = userChallengesTemp.map(obj=> ({ ...obj, participants: participants.find(entry => entry._id === obj.id)!["count"]}))
            setChallenges(userChallengesTemp);
            setLoaded(false);
        }
    },[loaded, participants])

    const routes = [
        {name: 'Dashboard', to: '/admin'},
        {name: 'Requests', to: '/admin/requests'},
        {name: 'Challenges', to: '/admin/challenges'},
    ]

    return(
        <div id="solvechallenge">
            <div className="w-full flex h-full flex-col md:flex-row">
                <div className="hidden w-1/6 bg-white md:flex h-full shadow flex-col p-6">
                    <h1 className="my-6 text-secondary font-light text-3xl">Eurytus Admin</h1>
                    {
                        routes.map((el,index)=>{
                            return (
                                <NavLink to={el.to}
                                    key={el.name} 
                                    className={({ isActive }) =>
                                        `${isActive ? 'text-white bg-secondary' : 'text-gray-900 hover:bg-gray-200'} rounded p-3 text-sm mt-2 font-semibold`
                                    }
                                    end= {true}>
                                    {el.name}
                                </NavLink>
                            )
                        })
                    }
                </div>
                <Disclosure as="nav" className="md:hidden bg-white w-full z-10">
                {({ open }) => (
                    <>    
                    <div className='flex w-full items-center shadow justify-center'>
                        <h1 className="text-secondary font-light text-3xl text-center">Eurytus Admin</h1>
                        <Disclosure.Button className={`right-0 h-14 ml-2`}>
                            {open ? (
                                <FaAngleUp className="h-6 w-6 text-secondary_dark" aria-hidden="true" />
                                ) : (
                                <FaAngleDown className="block h-6 w-6 text-secondary_dark" aria-hidden="true" />
                            )}
                        </Disclosure.Button>      
                    </div>  
                    <Disclosure.Panel className="md:hidden shadow">
                        <div className={`px-2 pt-2 flex flex-col space-y-1 ${open? 'bg-white': ''}`}>
                            {routes.map((item) => (
                                
                            <NavLink
                                key={item.name}
                                to={item.to}
                                className={({ isActive }) =>
                                    `${isActive ? 'text-white bg-secondary' : 'text-gray-900 hover:bg-gray-200'} rounded p-3 text-sm mt-2 font-semibold`
                                
                                }
                                end= {true}
                            >
                                {item.name}
                                
                            </NavLink>
                            ))}
                        </div>
                    </Disclosure.Panel>
                    </>
                )}
                </Disclosure>
                <div className="w-full p-4 md:w-5/6 md:p-14 h-full">
                    <ChallengesContext.Provider value={{challenges,setChallenges}}>
                        <RequestsContext.Provider value={{requests, setRequests}}>
                            <Outlet/>
                        </RequestsContext.Provider>
                    </ChallengesContext.Provider>
                </div>
            </div>
        </div>
    )
}

export default AdminPage;