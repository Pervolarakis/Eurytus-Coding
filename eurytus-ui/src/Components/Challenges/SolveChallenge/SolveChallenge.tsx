import {axios} from "../../../Api/eurytusInstance";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Ide from "../../Ide/Ide";
import ChallengeDescription from "./ChallengeDescription";
import SubmitChallenge, {executionMessage} from "./SubmitChallenge";
import { toast } from "react-toastify";
import { useCountdown } from "./useCountDown";

interface challenge {
    name: string,
    difficulty: number,
    id: string,
    description: string,
    language: string,
    creatorId: string,
    template: string,
    isPublic: boolean,
    expiresAt: string
}

const SolveChallenge = () => {

    const {challengeId} = useParams();
    let navigate = useNavigate();
    const [ challenge,setChallenge ] = useState<challenge>();
    const [ ideValue, setIdeValue ] = useState('');
    const [ executionMessage, setExecutionMessage ] = useState<executionMessage>();

    useEffect(()=>{
        axios.get(`/challenges/${challengeId}`)
            .then((res)=>{setChallenge(res.data.data);setIdeValue(JSON.parse(res.data.data.template))})
            .catch(err=>toast.error(err.response?.data.error||'There was an error fetching challenge!'))
    },[challengeId])
    
    const onCodeRun = () => {
        axios.post(`/compile/challenge${challenge!.language}/${challengeId}`,{
            solution: JSON.stringify(ideValue)
        })
        .then((res)=>{setExecutionMessage(res.data)})
        .catch((err)=>{
            toast.error(err.response?.data.error||'There was an error executing your code. This is probably an error on our end. We are sorry for that.')
        })
    }

    const submitCode = () => {
        axios.post(`/compile/challenge${challenge!.language}/${challengeId}?submit=true`,{
            solution: JSON.stringify(ideValue)
        })
        .then((res)=>{
            toast.success('Assignment Submitted!')
            navigate('/challenges');
        })
        .catch((err)=>{
            toast.error(err.response?.data.error||'There was an error submitting your assignment.')
        })
    }

    return(
        <div className="w-full" id="solvechallenge">
            {(challenge)?
            <div className="flex w-full h-full ">
                <ChallengeDescription name={challenge.name} isPublic={challenge.isPublic} expiresAt={challenge?.expiresAt} description={challenge.description} difficulty={challenge.difficulty} language={challenge.language}/>
                <div className="w-4/6">
                    <div className="h-5/6">
                        <Ide language={(challenge.language==='js')?'javascript':challenge.language} value={ideValue} changeValue={(val)=>setIdeValue(val)}/>
                    </div>
                    <div className="h-1/6">
                        <SubmitChallenge onCodeRun={()=>onCodeRun()} submitCode={()=>submitCode()} executionMessage={executionMessage}/>
                    </div>
                    
                </div>
            </div>:null}
        </div>
    )
}

export default SolveChallenge;