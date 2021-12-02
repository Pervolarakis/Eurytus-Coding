interface ChallengeListItemProps {
    name: string,
    description:string,
    difficulty: number,
    language: string,
    id: string
}

const ChallengeListItem = ({name, description, difficulty, language, id}: ChallengeListItemProps) => {
    return(
        <div className="w-full h-48 md:h-24 rounded-lg shadow-lg border p-3 overflow-hidden flex flex-col md:flex-row">
            <div className="w-full md:w-3/4 flex flex-col items-start overflow-hidden">
                <div className="flex justify-between w-full">
                    <h1 className="font-bold capitalize text-xl">{name}</h1>
                    <div className="hidden md:flex">
                        <h1 className="font-bold capitalize">{language}</h1>
                        <div className="flex gap-1 items-center ml-4">
                            <div className="w-5 bg-red-400 h-3 rounded-lg"></div>
                            <div className="w-5 bg-red-400 h-3 rounded-lg"></div>
                            <div className="w-5 bg-red-400 h-3 rounded-lg"></div>
                            <div className="w-5 bg-gray-300 h-3 rounded-lg"></div>
                            <div className="w-5 bg-gray-300 h-3 rounded-lg"></div>
                        </div>
                    </div>
                </div>
                <p className="text-left">{description}</p>
            </div>
            <div className="w-full md:w-1/4 flex justify-between items-center md:justify-center mt-3">
                <div className="flex md:hidden">
                    <h1 className="font-bold capitalize">{language}</h1>
                    <div className="flex gap-1 items-center ml-4">
                        <div className="w-5 bg-red-400 h-3 rounded-lg"></div>
                        <div className="w-5 bg-red-400 h-3 rounded-lg"></div>
                        <div className="w-5 bg-red-400 h-3 rounded-lg"></div>
                        <div className="w-5 bg-gray-300 h-3 rounded-lg"></div>
                        <div className="w-5 bg-gray-300 h-3 rounded-lg"></div>
                    </div>
                </div>
                <button className="font-bold text-secondary text-xl border-4 rounded-xl py-2 px-16 border-secondary hover:bg-secondary hover:text-white">Solve!</button>
            </div>
        </div>
    )
}

export default ChallengeListItem;