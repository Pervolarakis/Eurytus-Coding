import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-gridy-sprites';
import { useEffect, useRef, useState } from 'react';
import TablePagination from './TablePagination';

interface PendingRequest {
    id: string,
    created_at: string,
    name: string,
    kind: string,
    ownerId: string
} 

const PendingRequestsTable = ({requests, fixed}:{requests: PendingRequest[], fixed?:boolean}) => {
    
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

    useEffect(()=>{
        // console.log('eee', currentPage)
        const tempTableRows: React.ReactNode[] = []
        let startingIndex = 0
        let endingIndex = requests.length
        if(!fixed){
            startingIndex = (currentPage-1)*Math.floor(tableHeight/48.5)
            endingIndex = currentPage*Math.floor(tableHeight/48.5)
        }
        requests.slice(startingIndex,endingIndex).map((request) => tempTableRows.push(
            <tr key={request.id} className="even:bg-gray-100">
                <td className="px-6 py-3 whitespace-nowrap text-left">
                    <div className="flex items-center">
                        <div className="text-left">
                            <div className="text-sm font-medium text-gray-900 ">{request.created_at}</div>
                        </div>
                    </div>
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-left">
                    <div className="text-sm text-gray-900">{request.name}</div>
                </td>
                <td className="px-6 py-3 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${request.kind? 'text-green-800 bg-green-100': 'text-yellow-800 bg-yellow-100'}`}>
                        {request.kind? 'isPublic': 'Private'}
                    </span>
                </td>
                <td className="px-6 py-2 whitespace-nowrap flex justify-center">
                    <img className="h-7 w-7 rounded-full" src={getUserImage(request.ownerId)} alt="" />
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-sm font-medium">
                    <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        Inspect
                    </a>
                </td>
            </tr>
        ))
        setTableRows(tempTableRows);
        // console.log('first index ',(currentPage-1)*Math.floor(tableHeight/48.5))
        // console.log('last index ',(currentPage)*Math.floor(tableHeight/48.5))
    },[currentPage, tableHeight])

    const getUserImage = (userId: string) => {
        let svg = createAvatar(style, {
            seed: userId,
            // ... and other options
        });

        var svg64 = btoa(unescape(encodeURIComponent(svg)));
        var image64 = "data:image/svg+xml;base64," + svg64;
        return image64

    }
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
                                created_at
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Challenge Name
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                kind
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                User
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Action
                            </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white ">
                            {tableRows}
                        </tbody>
                    </table>
                </div>
            </div>
            {!fixed?<TablePagination totalRows={requests.length} currentPage={currentPage} setCurrentPage={setCurrentPage} rowsPerPage={Math.floor(tableHeight/48.5)}/>:null}
        </div>
    )
}

export default PendingRequestsTable;