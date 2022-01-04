import { Tab } from "@headlessui/react";
import { useEffect, useState } from "react";
import { SiGooglemessages } from "react-icons/si";
import { useParams } from "react-router-dom";
import { axios } from "../../../Api/eurytusInstance";
import ChallengeDetails from "../../Challenges/PreviewChallenge/ChallengeDetails";
import InputOutputList from "../../Challenges/PreviewChallenge/InputOutputList";
import ClassBuilder from "../../ClassBuilder/ClassBuilder";
import Ide from "../../Ide/Ide";
import BasicModal from "../../Modals/RequestReviewMessageModal";
import { fetchedDataType, requestChallengeProperties } from "./ReviewRequestInterfaces";
import { BsCardText } from "react-icons/bs";

const PreviewUpdateChallengeRequest = () => {
    const {requestId} = useParams();

    const [changes, setChanges] = useState<Partial<fetchedDataType>>()
    const [message, setMessage] = useState('');
    const [challengeAfterChanges, setChallengeAfterChanges] = useState<requestChallengeProperties>()
    const [challengeBeforeChanges, setChallengeBeforeChanges] = useState<requestChallengeProperties>()
    const [showModal, toggleShowModal] = useState(true)
    const [user, setUser] = useState('')

    useEffect(()=>{
        axios.get(`/moderate/requests/${requestId}`)
            .then((res)=>{
                setChanges({...JSON.parse(res.data.data.data)})
                setMessage(res.data.data.message)
                setUser(res.data.data.ownerId)
                // console.log(JSON.parse(res.data.data.data))
                axios.get(`/challenges/${res.data.data.challengeId}`)
                    .then((res)=>{
                        const oldChallengeData = res.data.data;
                        setChallengeBeforeChanges({
                            template: JSON.parse(oldChallengeData.template),
                            classDiagram: (oldChallengeData.expectedStructure.length>0?JSON.parse(oldChallengeData.expectedStructure.replaceAll('\\\"','\"')):[
                                {
                                    blockType: "Base",
                                    expanded: true,
                                    children: []
                                
                                }
                            ]),
                            inputTests: JSON.parse(oldChallengeData.expectedOutputTests),
                            challengeDetails: {
                                name: oldChallengeData.name,
                                description: oldChallengeData.description,
                                difficulty: oldChallengeData.difficulty,
                                startsAt: new Date(oldChallengeData.startsAt),
                                isPublic: oldChallengeData.isPublic,
                                expiresAt: new Date(oldChallengeData.expiresAt),
                                language: oldChallengeData.language,
                                expectedDesignPatterns: oldChallengeData.expectedDesignPatterns,
                            }
                        })
                    })
            })
    },[])

    useEffect(()=>{
        if(challengeBeforeChanges && changes && message){
            setChallengeAfterChanges({
                template: changes.template || challengeBeforeChanges.template,
                classDiagram: changes.expectedStructure? (changes.expectedStructure.length>0?JSON.parse(changes.expectedStructure.replaceAll('\\\"','\"')):[
                    {
                        blockType: "Base",
                        expanded: true,
                        children: []
                    
                    }
                ]): challengeBeforeChanges.classDiagram,
                inputTests: (changes.expectedOutputTests)? JSON.parse(changes.expectedOutputTests) : challengeBeforeChanges.inputTests,
                challengeDetails: {
                    name: changes.name || challengeBeforeChanges.challengeDetails.name,
                    description: changes.description || challengeBeforeChanges.challengeDetails.description,
                    difficulty: changes.difficulty || challengeBeforeChanges.challengeDetails.difficulty,
                    startsAt: changes.startsAt? new Date(changes.startsAt) : new Date(challengeBeforeChanges.challengeDetails.startsAt),
                    isPublic: changes.isPublic || challengeBeforeChanges.challengeDetails.isPublic,
                    expiresAt: changes.expiresAt? new Date(changes.expiresAt) : new Date(challengeBeforeChanges.challengeDetails.expiresAt),
                    language: changes.language || challengeBeforeChanges.challengeDetails.language,
                    expectedDesignPatterns: changes.expectedDesignPatterns || challengeBeforeChanges.challengeDetails.expectedDesignPatterns,
                },
                message: message
            })
        }
        // console.log(challengeBeforeChanges)
    },[challengeBeforeChanges, changes, message])

    return (
        <div id='solvechallenge'>
            <BasicModal show={showModal} toggleShow={()=>toggleShowModal(false)} message={message} userId={user}/>
            <div className='bg-black flex justify-between items-center h-12 p-4'>
                <h1 className="text-white text-2xl font-bold">Review Update Challenge</h1>
                <button onClick={()=>toggleShowModal(true)}>
                    <BsCardText color="white" size={40}/>
                </button>
                <div>
                    <button className="h-10 border border-red-600 w-40 text-2xl font-bold text-red-600 rounded-md" onClick={()=>null}>Decline</button>
                    <button className="h-10 bg-green-500 w-40 text-2xl font-bold text-white rounded-md ml-4" onClick={()=>null}>Approve</button>
                </div>
            </div>
            {(challengeAfterChanges && challengeBeforeChanges)?
                <Tab.Group>
                <Tab.List className="h-14 bg-white flex justify-between">
                    <Tab className={({ selected }) =>
                        selected ? 'border-b-4 border-secondary  flex-1 font-bold h-14' : 'flex-1 border-b-4 border-white h-14'
                    }>Details</Tab>
                    <Tab className={({ selected }) =>
                        selected ? 'border-b-4 border-secondary  flex-1 font-bold h-14' : 'flex-1 border-b-4 border-white h-14'
                    }>Template</Tab>
                    <Tab disabled={challengeAfterChanges.challengeDetails.language!=='java'} className={({ selected }) =>
                        selected ? 'border-b-4 border-secondary  flex-1 font-bold h-14' : 'flex-1 border-b-4 border-white h-14'
                    }>Structure</Tab>
                    <Tab className={({ selected }) =>
                        selected ? 'border-b-4 border-secondary  flex-1 font-bold h-14' : 'flex-1 border-b-4 border-white h-14'
                    }>Input Output</Tab>
                </Tab.List>
                <Tab.Panels className="h-full">
                    <Tab.Panel className="h-full overflow-y-hidden">
                        <div className="w-full h-full flex flex-row">
                            <div className="w-1/2 overflow-x-scroll">
                                <ChallengeDetails challengeDetails={challengeBeforeChanges.challengeDetails} updateField={()=>null} message={''} setMessage={()=>null}/>
                            </div>
                            <div className="w-1/2 overflow-x-scroll">
                                <ChallengeDetails challengeDetails={challengeAfterChanges.challengeDetails} updateField={()=>null} message={''} setMessage={()=>null}/>
                            </div>
                        </div>
                    </Tab.Panel>
                    <Tab.Panel className="h-full overflow-y-hidden">
                        <div className="h-full flex flex-row">
                            <Ide value={challengeBeforeChanges.template} changeValue={()=>null} language='java'/>
                            <Ide value={challengeAfterChanges.template} changeValue={()=>null} language='java'/>
                        </div>
                    </Tab.Panel>
                    <Tab.Panel className="h-full overflow-y-scroll">
                        <div className="w-full h-full flex flex-row">
                            <div className="w-1/2 overflow-x-scroll">
                                <ClassBuilder treeData={challengeBeforeChanges.classDiagram} setTreeData={()=>null}/>
                            </div>
                            <div className="w-1/2 overflow-x-scroll">
                                <ClassBuilder treeData={challengeAfterChanges.classDiagram} setTreeData={()=>null}/>
                            </div>
                        </div>
                    </Tab.Panel>
                    <Tab.Panel className="h-full overflow-y-scroll">
                        <div className="h-full flex flex-row">
                            <InputOutputList testList={challengeBeforeChanges.inputTests} setTestList={()=>null}/>
                            <InputOutputList testList={challengeAfterChanges.inputTests} setTestList={()=>null}/>

                        </div>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>:null}
        </div>
    )
}

export default PreviewUpdateChallengeRequest;