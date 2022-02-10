interface ChallengeDescriptionProps {
    name: String,
    difficulty: number,
    language: string,
    description: string,
}

const ChallengeDescription = ({name, difficulty, language, description}: ChallengeDescriptionProps) => {
    return(
        <div className="w-2/6 bg-white h-full border-r-2">
            <div className="w-full h-1/6 border-b-2 border-solid border-black p-8 flex flex-col items-start">
                <p className="font-bold text-2xl">{name}</p>
                <p className="font-semibold text-xl mt-2">Difficulty: {difficulty} Language: {language}</p>
            </div>
            <div className="p-8 flex flex-col items-start">
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