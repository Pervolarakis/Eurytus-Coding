import { Tab } from '@headlessui/react'
import { useEffect, useState } from 'react'
import Ide from '../../Ide/Ide'
import ClassBuilder from '../../ClassBuilder/ClassBuilder'
import InputOutputList from './InputOutputList'
import {TreeItem } from "react-sortable-tree";
import ChallengeDetails from './ChallengeDetails'

interface challengeTest {
    input: string; 
    output: string
}

export interface fieldType {
    name: string,
    description: string,
    difficulty: number,
    startsAt: Date,
    isPublic: boolean,
    expiresAt: Date,
    language: string,
    expectedDesignPatterns: string[]
}

const CreateChallenge = () => {

    const [template, setTemplate] = useState('')
    const [classDiagram, setClassDiagram] = useState<TreeItem[]>([
        {
            blockType: "Base",
            expanded: true,
            children: []
        
        }
    ])
    const [inputTests, setInputTests] = useState<{"challenge": challengeTest[]}>({
        "challenge" : []
    })

    const [challengeDetails, setChallengeDetails] = useState<fieldType>({
        name: "",
        description: "",
        difficulty: 1,
        startsAt: new Date(),
        isPublic: false,
        expiresAt: new Date(),
        language: 'js',
        expectedDesignPatterns: []
    })
    

    const updateField = (change: Partial<fieldType>) => {
        const detailsCopy = {...challengeDetails, ...change};
        // console.log(change)
        setChallengeDetails(detailsCopy)
    }

    // const transformData = () => {
    //     console.log(JSON.stringify(classDiagram).replaceAll("\"[\\\"","[\\\"").replaceAll("\\\"]\"","\\\"]").replaceAll("\" ","\"").replaceAll(" \"","\"").replaceAll("\"[]\"","[]"));
    // }

    // useEffect(()=>{transformData()},[classDiagram])

    return(
        <div id='solvechallenge'>
            <div className='bg-black flex justify-between items-center h-12 p-4'>
                <h1 className="text-white text-2xl font-bold">Create Challenge</h1>
                <button className="h-10 bg-yellow-300 w-40 text-2xl font-bold text-white rounded-lg">Submit</button>
            </div>
            <div className="h-full w-full flex flex-row">
                <div className="w-1/2 h-full">
                    <ChallengeDetails challengeDetails={challengeDetails} updateField={updateField}/>
                </div>
                <div className="w-1/2 h-full border-l border-gray-500 flex flex-col">
                    <Tab.Group>
                        <Tab.List className="h-14 bg-white flex justify-between overflow-hidden">
                            <Tab className={({ selected }) =>
                                selected ? 'border-b-4 border-secondary  flex-1 font-bold' : 'flex-1 border-b-4 border-white'
                            }>Template</Tab>
                            <Tab disabled={challengeDetails.language!=='java'} className={({ selected }) =>
                                selected ? 'border-b-4 border-secondary  flex-1 font-bold' : 'flex-1 border-b-4 border-white'
                            }>Structure</Tab>
                            <Tab className={({ selected }) =>
                                selected ? 'border-b-4 border-secondary  flex-1 font-bold' : 'flex-1 border-b-4 border-white'
                            }>Input Output</Tab>
                        </Tab.List>
                        <Tab.Panels className="h-full">
                            <Tab.Panel className="h-full"><Ide value={template} changeValue={(e)=>setTemplate(e)} language='java'/></Tab.Panel>
                            <Tab.Panel className="h-full overflow-y-scroll"><ClassBuilder treeData={classDiagram} setTreeData={(val)=>setClassDiagram(val)}/></Tab.Panel>
                            <Tab.Panel className="h-full overflow-y-scroll"><InputOutputList testList={inputTests} setTestList={(val)=>setInputTests(val)}/></Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>
        </div>
    )
}

export default CreateChallenge