import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {TreeItem } from "react-sortable-tree";
import {axios} from '../../../Api/eurytusInstance';
import PreviewChallenge from '../PreviewChallenge/PreviewChallenge'
import {challengeTest, fieldType} from '../PreviewChallenge/PreviewChallenge';


const CreateChallenge = () => {
    let navigate = useNavigate();
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
        expectedDesignPatterns: [],
    })

    const [message, setMessage] = useState('');
    
    const transformData = () => {
        if(classDiagram[0].children?.length!==0 && challengeDetails.language!=='js'){
            return (JSON.stringify(classDiagram).replaceAll("\"[\\\"","[\\\"").replaceAll("\\\"]\"","\\\"]").replaceAll("\" ","\"").replaceAll(" \"","\"").replaceAll("\"[]\"","[]"));
        }else{
            return ''
        }
    }

    useEffect(()=>{
        if(challengeDetails.language==='js'){
            updateField({expectedDesignPatterns: []})
        }
    },[challengeDetails.language])

    const createChallenge = () => {
        axios.post('/challenges/new', {
            ...challengeDetails,
            isPublic: challengeDetails.isPublic===true? "true": "false",
            expectedOutputTests: JSON.stringify(inputTests),
            expectedStructure: transformData(),     
            template: JSON.stringify(template),
            ...(challengeDetails.isPublic? {message: message} : {})
        })
        .then((res)=>navigate('/challenges'))
        .catch((err)=>console.log(err.response ))
    }

    const updateField = (change: Partial<fieldType>) => {
        const detailsCopy = {...challengeDetails, ...change};
        setChallengeDetails(detailsCopy)
    }

    // useEffect(()=>{console.log(transformData())},[classDiagram])

    return(
        <div id='solvechallenge'>
            <div className='bg-black flex justify-between items-center h-12 p-4'>
                <h1 className="text-white text-2xl font-bold">Create Challenge</h1>
                <button className="h-10 bg-yellow-300 w-40 text-2xl font-bold text-white rounded-lg" onClick={()=>createChallenge()}>Submit</button>
            </div>
            <PreviewChallenge template={template} message={message} setMessage={setMessage} setTemplate={setTemplate} classDiagram={classDiagram} setClassDiagram={setClassDiagram} challengeDetails={challengeDetails} updateField={updateField} inputTests={inputTests} setInputTests={setInputTests}/>
        </div>
    )
}

export default CreateChallenge