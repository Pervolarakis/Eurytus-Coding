import { useEffect, useRef, useState } from "react";
import TablePagination from "./TablePagination";

interface Challenge {
    id: string,
    name: string,
    description: string,
    isPublic: boolean,
    language: string,
    participants: number
}


const ChallengesTable = ({challenges, fixed}: {challenges: Challenge[], fixed?:boolean}) => {

    const tableRef = useRef() as React.MutableRefObject<HTMLInputElement>;;
    const [tableHeight, setTableHeight] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [tableRows, setTableRows] = useState<React.ReactNode[]>([])
    
    useEffect(() => {
        if(!fixed){
            getWindowHeight()
            window.addEventListener("resize", getWindowHeight);
        }
    }, []);

    const getWindowHeight = () => {
        const paginationPanelHeight = tableRef.current.children[1].clientHeight;
        const tableHeadHeight = tableRef.current.children[0].children[0].children[0].children[0].clientHeight
        const newHeight = tableRef.current.clientHeight - tableHeadHeight -24 - paginationPanelHeight;
        setTableHeight(newHeight);
    }

    // useEffect(()=>{
    //     console.log(Math.floor(tableHeight/48.5))
    // })

    useEffect(()=>{
        // console.log('eee', currentPage)
        const tempTableRows: React.ReactNode[] = []
        let startingIndex = 0
        let endingIndex = challenges.length
        if(!fixed){
            startingIndex = (currentPage-1)*Math.floor(tableHeight/48.5)
            endingIndex = currentPage*Math.floor(tableHeight/48.5)
        }
        challenges.slice(startingIndex,endingIndex).map((challenge) => tempTableRows.push(
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
        ))
        setTableRows(tempTableRows);
        // console.log('first index ',(currentPage-1)*Math.floor(tableHeight/48.5))
        // console.log('last index ',(currentPage)*Math.floor(tableHeight/48.5))
    },[currentPage, tableHeight])

    return (
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 h-full" ref={tableRef}>
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
                            {tableRows}
                        </tbody>
                    </table>
                </div>
            </div>
            {!fixed?<TablePagination totalRows={challenges.length} currentPage={currentPage} setCurrentPage={setCurrentPage} rowsPerPage={Math.floor(tableHeight/48.5)}/>:null}
        </div>
    )
}

export default ChallengesTable;