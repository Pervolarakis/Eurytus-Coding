import DateTimePicker from 'react-datetime-picker';
import { fieldType } from './PreviewChallenge';

interface ChallengeDetailsProps {
    challengeDetails: fieldType,
    updateField: (change: Partial<fieldType>)=>void
}

const ChallengeDetails = ({challengeDetails, updateField}: ChallengeDetailsProps) => {

    const selectDesignPattern = (pattern: string) => {
        const patternsCopy = [...challengeDetails.expectedDesignPatterns]
        if(patternsCopy.indexOf(pattern)>-1){
            patternsCopy.splice(patternsCopy.indexOf(pattern),1)
        }else{
            patternsCopy.push(pattern)
        }
        updateField({expectedDesignPatterns: patternsCopy})
    }
    // console.log(typeof challengeDetails.isPublic)
    return(
        <div className="flex flex-col items-center h-full p-8">
            <div className="flex w-full justify-between">
                <div className="flex items-center">
                    <h1 className="text-lg font-medium mr-4">Challenge Name</h1>
                    <input value={challengeDetails.name} onChange={(e)=>updateField({name: e.target.value})} className="w-72 h-10 rounded p-2 border text-xl focus:outline-none selection:bg-secondary selection:text-white focus:border-secondary" placeholder="Challenge Name"/>
                </div>
                <div className="flex items-center">
                    <h1 className="text-lg font-medium mr-4">Language</h1>
                    <select className='h-10 rounded border focus:border-secondary p-2 outline-none' value={challengeDetails.language} onChange={(e)=>updateField({language: e.target.value})}>
                        <option value="js">JS</option>
                        <option value="java">JAVA</option>
                    </select>
                </div>
            </div>
            <div className='w-full flex flex-col items-start mt-5'>
                <h1 className="text-lg font-medium mr-4 mb-2">Description</h1>
                <textarea value={challengeDetails.description} onChange={(e)=>updateField({description: e.target.value})} className='h-60 w-full border text-xl rounded p-2 focus:outline-none selection:bg-secondary selection:text-white focus:border-secondary' placeholder='Challenge Description'/>
            </div>
            <div className="flex w-full justify-between mt-5">
                <div className="flex items-center">
                    <input type="checkbox" className='h-5 w-5' onChange={(e)=>updateField({isPublic: !challengeDetails.isPublic})} checked={((typeof(challengeDetails.isPublic)=='string')?(challengeDetails.isPublic==='true'):challengeDetails.isPublic)}/>
                    <h1 className="text-lg font-medium ml-4">Public</h1>
                </div>
                <div className="flex items-center">
                    <h1 className="text-lg font-medium mr-4">Difficulty</h1>
                    <select className='h-10 rounded border focus:border-secondary p-2 outline-none' value={challengeDetails.difficulty} onChange={(e)=>updateField({difficulty: parseInt(e.target.value)})}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
            </div>
            <div className="flex w-full justify-between mt-5">
                <div className="flex items-center">
                    <h1 className="text-lg font-medium mr-4">Start Date</h1>
                    <DateTimePicker
                        disabled={((typeof(challengeDetails.isPublic)=='string')?(challengeDetails.isPublic==='true'):challengeDetails.isPublic)}
                        onChange={(val)=>updateField({startsAt: val})}
                        value={challengeDetails.startsAt}
                        format={"dd-MM-y h:mm:ss a"}
                    />
                </div>
                <div className="flex items-center">
                    <h1 className="text-lg font-medium mr-4">End Date</h1>
                    <DateTimePicker
                        disabled={((typeof(challengeDetails.isPublic)=='string')?(challengeDetails.isPublic==='true'):challengeDetails.isPublic)}
                        onChange={(val)=>updateField({expiresAt: val})}
                        value={challengeDetails.expiresAt}
                        format={"dd-MM-y h:mm:ss a"}
                    />
                </div>
            </div>
            <div className="flex flex-col items-start w-full">
                <h1 className="text-lg font-medium  mt-7 mb-5">Required Design Patterns</h1>
                <div className="flex items-center">
                    <input type="checkbox" className='h-5 w-5' disabled={challengeDetails.language!=='java'} onChange={(e)=>selectDesignPattern('observer')} checked={challengeDetails.expectedDesignPatterns.indexOf('observer')>-1}/>
                    <h1 className="text-lg font-medium ml-2">Observer</h1>
                    <input type="checkbox" className='h-5 w-5 ml-4' disabled={challengeDetails.language!=='java'} onChange={(e)=>selectDesignPattern('factory')} checked={challengeDetails.expectedDesignPatterns.indexOf('factory')>-1}/>
                    <h1 className="text-lg font-medium ml-2">Factory</h1>
                    <input type="checkbox" className='h-5 w-5 ml-4' disabled={challengeDetails.language!=='java'} onChange={(e)=>selectDesignPattern('singleton')} checked={challengeDetails.expectedDesignPatterns.indexOf('singleton')>-1}/>
                    <h1 className="text-lg font-medium ml-2">Singleton</h1>
                </div>
            </div>
        </div>
    )
}

export default ChallengeDetails;