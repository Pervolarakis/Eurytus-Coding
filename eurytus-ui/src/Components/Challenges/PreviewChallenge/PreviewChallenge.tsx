import Ide from '../../Ide/Ide'
import ClassBuilder from '../../ClassBuilder/ClassBuilder'
import InputOutputList from '../PreviewChallenge/InputOutputList'
import ChallengeDetails from '../PreviewChallenge/ChallengeDetails'
import { Tab } from '@headlessui/react'
import { TreeItem } from 'ndanvers-react-sortable-tree'
import { useEffect, useState } from 'react'

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

export interface challengeTest {
    input: string; 
    output: string
}

interface PreviewChallengeProps {
    template: string
    setTemplate: (template: string)=>void;
    classDiagram: TreeItem[]
    setClassDiagram: (val: TreeItem[])=>void;
    challengeDetails: fieldType;
    updateField:(change: Partial<fieldType>) => void;
    inputTests: {"challenge": challengeTest[]}
    setInputTests: (newTestList: {"challenge": challengeTest[]})=>void
}

const PreviewChallenge = ({template, setTemplate, classDiagram, setClassDiagram, challengeDetails, updateField, inputTests, setInputTests}: PreviewChallengeProps) => {
    
    const [selectedIndex, setSelectedIndex] = useState(0)

    useEffect(()=>{
        if(challengeDetails.language==='js'){
            setSelectedIndex(0);
        }
    },[challengeDetails.language])

    return (
        <div className="h-full w-full flex flex-row">
            <div className="w-1/2 h-full">
                <ChallengeDetails challengeDetails={challengeDetails} updateField={updateField}/>
            </div>
            <div className="w-1/2 border-l border-gray-500 flex flex-col">
                <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                    <Tab.List className="h-14 bg-white flex justify-between">
                        <Tab className={({ selected }) =>
                            selected ? 'border-b-4 border-secondary  flex-1 font-bold h-14' : 'flex-1 border-b-4 border-white h-14'
                        }>Template</Tab>
                        <Tab disabled={challengeDetails.language!=='java'} className={({ selected }) =>
                            selected ? `border-b-4 border-secondary  flex-1 font-bold h-14 ${(challengeDetails.language!=='java')?'bg-gray-200':''}` : `flex-1 border-b-4 border-white h-14 ${(challengeDetails.language!=='java')?'bg-gray-200 border-gray-200':''}`
                        }>Structure</Tab>
                        <Tab className={({ selected }) =>
                            selected ? 'border-b-4 border-secondary  flex-1 font-bold h-14' : 'flex-1 border-b-4 border-white h-14'
                        }>Input Output</Tab>
                    </Tab.List>
                    <Tab.Panels className="h-full">
                        <Tab.Panel className="h-full overflow-y-hidden"><Ide value={template} changeValue={(e)=>setTemplate(e)} language='java'/></Tab.Panel>
                        <Tab.Panel className="h-full overflow-y-scroll"><ClassBuilder treeData={classDiagram} setTreeData={(val)=>setClassDiagram(val)}/></Tab.Panel>
                        <Tab.Panel className="h-full overflow-y-scroll"><InputOutputList testList={inputTests} setTestList={(val)=>setInputTests(val)}/></Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    )
}

export default PreviewChallenge;