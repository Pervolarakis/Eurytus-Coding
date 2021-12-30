import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Ide from "../../Ide/Ide";
import ChallengeDescription from "./ChallengeDescription";
import SubmitChallenge, {executionMessage} from "./SubmitChallenge";

interface challenge {
    name: string,
    difficulty: number,
    id: string,
    description: string,
    language: string,
    creatorId: string,
    template: string
}

const SolveChallenge = () => {

    const {challengeId} = useParams();
    
    const [ challenge,setChallenge ] = useState<challenge>();
    const [ ideValue, setIdeValue ] = useState('');
    const [ executionMessage, setExecutionMessage ] = useState<executionMessage>();

    useEffect(()=>{
        axios.get(`http://eurytus.com/api/v1/challenges/${challengeId}`)
            .then((res)=>{setChallenge(res.data.data);setIdeValue(JSON.parse(res.data.data.template))})
    },[challengeId])

    const onCodeRun = () => {
        axios.post(`http://eurytus.com/api/v1/compile/challenge${challenge!.language}/${challengeId}`,{
            solution: JSON.stringify(ideValue)
        })
        .then((res)=>{setExecutionMessage(res.data)})
    }

    return(
        <div className="w-full" id="solvechallenge">
            {(challenge)?
            <div className="flex w-full h-full ">
                <ChallengeDescription name={challenge.name} description={challenge.description} difficulty={challenge.difficulty} language={challenge.language}/>
                <div className="w-4/6">
                    <div className="h-5/6">
                        <Ide language={(challenge.language==='js')?'javascript':challenge.language} value={ideValue} changeValue={(val)=>setIdeValue(val)}/>
                    </div>
                    <div className="h-1/6">
                        <SubmitChallenge onCodeRun={()=>onCodeRun()} executionMessage={executionMessage}/>
                    </div>
                    
                </div>
            </div>:null}
        </div>
    )
}

export default SolveChallenge;