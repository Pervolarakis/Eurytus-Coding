import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ChallengeListItemProps {
    name: string,
    description:string,
    difficulty: number,
    language: string,
    id: string
}

const ChallengeListItem = ({name, description, difficulty, language, id}: ChallengeListItemProps) => {

    const [difficultyComponents, setDifficultyComponents] = useState<String[]>([])
    let navigate = useNavigate();

    useEffect(()=>{
        let tempArr = []
        for(let i=0; i<difficulty; i++){
            tempArr.push("difficulty-filled")
        }
        for(let i=0; i<5-difficulty; i++){
            tempArr.push("difficulty-empty")
        }
        setDifficultyComponents(tempArr)
    },[difficulty])

    return(
        <div className="w-full h-48 md:h-36 rounded-lg shadow-lg border-2 p-3 overflow-hidden flex flex-col md:flex-row">
            <div className="w-full md:w-3/4 flex flex-col items-start overflow-hidden">
                <div className="flex justify-between w-full">
                    <h1 className="font-bold capitalize text-xl">{name}</h1>
                    <div className="hidden md:flex">
                        <h1 className="font-bold capitalize">{language}</h1>
                        <div className="flex gap-1 items-center ml-4">
                            {difficultyComponents.map((el,index)=><div className={`${el}`} key={`${id}-${index}`}></div>)}
                        </div>
                    </div>
                </div>
                <p className="text-left">{description}</p>
            </div>
            <div className="w-full md:w-1/4 flex justify-between items-center md:justify-center mt-auto md:m-auto">
                <div className="flex md:hidden">
                    <h1 className="font-bold capitalize">{language}</h1>
                    <div className="flex gap-1 items-center ml-4">
                    {difficultyComponents.map((el,index)=><div className={`${el}`} key={`${id}-${index}`}></div>)}
                    </div>
                </div>
                <button className="font-bold text-secondary text-xl border-4 rounded-xl py-1 px-4 md:py-2 md:px-16 border-secondary hover:bg-secondary hover:text-white" onClick={()=>navigate(`/solve/${id}`)}>Solve!</button>
            </div>
        </div>
    )
}

export default ChallengeListItem;