import { useEffect, useState } from "react"
import { useCountdown } from "./useCountDown";

interface ChallengeDescriptionProps {
    name: String,
    difficulty: number,
    language: string,
    description: string,
    isPublic: boolean,
    expiresAt: string
}

const ChallengeDescription = ({name, difficulty, language, description, isPublic, expiresAt}: ChallengeDescriptionProps) => {
    const [startingTime, serStartingTime] = useState<string>('');
    const [days, hours, minutes, seconds] = useCountdown(startingTime);
    useEffect(()=>{
        if(expiresAt && !isPublic){
            serStartingTime(expiresAt)
        
        }
    },[expiresAt])

    return(
        <div className="w-2/6 bg-white h-full border-r-2">
            <div className="w-full min-h-1/6 p-8 flex flex-col items-start">
                <p className="font-bold text-2xl">{name}</p>
                <p className="font-semibold text-xl mt-2">Difficulty: {difficulty} Language: {language}</p>
                {(!isPublic)?
                    (days+hours+minutes+seconds>0)?
                <div>Time remaining {('0' + hours).slice(-2)}:{('0' + minutes).slice(-2)}:{('0' + seconds).slice(-2)}</div>:<p>Expired</p>:null}
            </div>
            <div className="p-8 flex flex-col border-t-2 border-solid border-black items-start">
                <p className="font-semibold text-left text-lg">{description}</p>
                {/* <p className="mt-4 text text-lg">Example:</p>
                <div className="bg-gray-300 w-full mt-4">
                    {example}
                </div> */}
            </div>
        </div>
    )

}

export default ChallengeDescription;