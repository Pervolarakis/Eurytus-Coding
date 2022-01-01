interface Challenge {
    id: string,
    name: string,
    description: string,
    isPublic: boolean,
    language: string,
    participants: number
}

const ChallengesTable = ({challenges}: {challenges: Challenge[]}) => {
    return (
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Challenge Name
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Description
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                isPublic
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Language
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Participants
                            </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white ">
                            {challenges.map((challenge) => (
                            <tr key={challenge.id} className="even:bg-gray-100">
                                <td className="px-6 py-3 whitespace-nowrap text-left">
                                <div className="flex items-center">
                                    <div className="text-left">
                                    <div className="text-sm font-medium text-gray-900 ">{challenge.name}</div>
                                    </div>
                                </div>
                                </td>
                                <td className="px-6 py-3 whitespace-nowrap text-left">
                                <div className="text-sm text-gray-900">{challenge.description.slice(0,60)}...</div>
                                </td>
                                <td className="px-6 py-3 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${challenge.isPublic? 'text-green-800 bg-green-100': 'text-yellow-800 bg-yellow-100'}`}>
                                        {challenge.isPublic? 'isPublic': 'Private'}
                                    </span>
                                </td>
                                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${(challenge.language==='java')?'text-pink-800 bg-pink-100': 'text-blue-800 bg-blue-100'}`}>
                                        {(challenge.language==='java')?'Java':'Javascript'}
                                    </span>
                                </td>
                                <td className="px-6 py-3 whitespace-nowrap text-sm font-medium">
                                    <div className="text-sm text-gray-900">{challenge.participants}</div>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ChallengesTable;