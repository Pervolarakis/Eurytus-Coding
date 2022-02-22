import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {axios} from '../../../Api/eurytusInstance';
import { requestChallengeProperties } from '../../AdminPage/ModerateChallenges/ReviewRequestInterfaces';
import PreviewChallenge from '../PreviewChallenge/PreviewChallenge'
import {fieldType} from '../PreviewChallenge/PreviewChallenge';
import SetRequestMessageModal from '../../Modals/SetRequestMessageModal';
import { toast } from 'react-toastify';

const CreateChallenge = () => {
    let navigate = useNavigate();

    const [showRequestModal, toggleRequestModal] = useState(false);
    const [challenge, setChallenge] = useState<requestChallengeProperties>({
        template: '',
        classDiagram: [
            {
                blockType: "Base",
                expanded: true,
                children: []
            
            }
        ],
        inputTests: { "challenge" : []},
        challengeDetails: {
            name: "",
            description: "",
            difficulty: 1,
            startsAt: new Date(),
            isPublic: false,
            expiresAt: new Date(),
            language: 'js',
            expectedDesignPatterns: [],
        }
    })

    const [message, setMessage] = useState('');
    
    const transformData = () => {
        if(challenge.classDiagram[0].children?.length!==0 && challenge.challengeDetails.language!=='js'){
            return (JSON.stringify(challenge.classDiagram).replaceAll("\"[\\\"","[\\\"").replaceAll("\\\"]\"","\\\"]").replaceAll("\" ","\"").replaceAll(" \"","\"").replaceAll("\"[]\"","[]"));
        }else{
            return ''
        }
    }

    useEffect(()=>{
        if(challenge.challengeDetails.language==='js'){
            updateChallengeDetails({expectedDesignPatterns: []})
        }
    },[challenge.challengeDetails.language])

    const createChallenge = () => {
        axios.post('/challenges/new', {
            ...challenge.challengeDetails,
            isPublic: challenge.challengeDetails.isPublic===true? "true": "false",
            expectedOutputTests: JSON.stringify({"challenge" : challenge.inputTests.challenge.filter((el)=>el.input!==JSON.stringify('')&&el.output!==JSON.stringify(''))}),
            expectedStructure: transformData(),     
            template: JSON.stringify(challenge.template),
            ...(challenge.challengeDetails.isPublic? {message: message} : {})
        })
        .then((res)=>{
            toast.success((challenge.challengeDetails.isPublic===true)?'Request Submitted!':'Challenge Created!')
            navigate('/challenges');
        })
        .catch((err)=>{
            err.response.data.error.map((err:{message: string, field: string})=>{
                toast.error(err.message);
            })
        } )
    }

    const updateField = (change: Partial<requestChallengeProperties>) => {
        if(challenge){
            const detailsCopy = {...challenge, ...change};
            setChallenge(detailsCopy)
        }
    }

    const updateChallengeDetails = (change: Partial<fieldType>) => {
        if(challenge){
            const detailsCopy = {...challenge.challengeDetails, ...change};
            // console.log(detailsCopy)
            setChallenge({...challenge, challengeDetails: detailsCopy})
        }
    }

    // useEffect(()=>{console.log(transformData())},[classDiagram])

    return(
        <div id='solvechallenge'>
            <SetRequestMessageModal show={showRequestModal} toggleShow={()=>toggleRequestModal(false)} submitRequest={()=>createChallenge()} message={message} setMessage={setMessage} />
            <div className='bg-black flex justify-between items-center h-12 p-4'>
                <h1 className="text-white text-2xl font-bold">Create Challenge</h1>
                <button className="h-10 bg-yellow-300 w-40 text-2xl font-bold text-white rounded-lg" onClick={challenge.challengeDetails.isPublic?()=>toggleRequestModal(true):()=>createChallenge()}>Submit</button>
            </div>
            <PreviewChallenge template={challenge.template} setTemplate={(val)=>updateField({template: val})} classDiagram={challenge.classDiagram} setClassDiagram={(val)=>updateField({classDiagram: val})} challengeDetails={challenge.challengeDetails} updateField={updateChallengeDetails} inputTests={challenge.inputTests} setInputTests={(val)=>updateField({inputTests: val})}/>
        </div>
    )
}

export default CreateChallenge