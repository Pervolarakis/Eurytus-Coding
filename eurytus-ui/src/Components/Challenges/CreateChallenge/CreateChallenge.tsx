import { Tab } from '@headlessui/react'
import { useState } from 'react'
import Ide from '../../Ide/Ide'
import ClassBuilder from '../../ClassBuilder/ClassBuilder'

const CreateChallenge = () => {

    const [template, setTemplate] = useState('')

    return(
        <div className='h-full'>
            <div className='bg-black flex justify-between items-center h-12 p-4'>
                <h1 className="text-white text-2xl font-bold">Create Challenge</h1>
                <button className="h-10 bg-yellow-300 w-40 text-2xl font-bold text-white rounded-lg">Submit</button>
            </div>
            <div className="h-full w-full flex flex-row">
                <div className="w-1/2 bg-yellow-50 h-full">
                </div>
                <div className="w-1/2 h-full border-l border-gray-500">
                    <Tab.Group>
                        <Tab.List className="h-14 bg-red-500 flex justify-between rounded-xl overflow-hidden mt-2">
                            <Tab className="bg-yellow-300 flex-1">Tab 1</Tab>
                            <Tab className="bg-yellow-300 flex-1">Tab 2</Tab>
                            <Tab className="bg-yellow-300 flex-1">Tab 3</Tab>
                        </Tab.List>
                        <Tab.Panels className="h-full mt-2">
                            <Tab.Panel className="h-full"><Ide value={template} changeValue={(e)=>setTemplate(e)} language='java'/></Tab.Panel>
                            <Tab.Panel><ClassBuilder/></Tab.Panel>
                            <Tab.Panel>Content 3</Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>
        </div>
    )
}

export default CreateChallenge