import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Ide from "../../Ide/Ide";
import ChallengeDescription from "./ChallengeDescription";
import SubmitChallenge from "./SubmitChallenge";

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
    const [challenge,setChallenge] = useState<challenge>();
    
    useEffect(()=>{
        axios.get(`http://eurytus.com/api/v1/challenges/${challengeId}`)
            .then((res)=>{setChallenge(res.data.data);console.log(res.data)})
    },[challengeId])

    return(
        <div>
            {(challenge)?
            <div className="flex w-full h-full">
                <ChallengeDescription name={challenge.name} description={challenge.description} difficulty={challenge.difficulty} creator={challenge.creatorId}/>
                <div className="w-4/6">
                    <Ide language={(challenge.language==='js')?'javascript':challenge.language} template={challenge.template}/>
                    <SubmitChallenge/>
                </div>
            </div>:null}
        </div>
    )
}

export default SolveChallenge;