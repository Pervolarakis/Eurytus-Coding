import { useEffect } from 'react';
import {HiChevronLeft, HiChevronRight} from 'react-icons/hi'

interface TablePaginationProps {
    totalRows: number,
    currentPage: number;
    rowsPerPage: number;
    setCurrentPage: (page: number)=>void
}

const TablePagination = ({totalRows, currentPage, rowsPerPage, setCurrentPage}: TablePaginationProps) => {

    const firstRowIndex = (currentPage-1)*rowsPerPage
    const finalPage = Math.ceil(totalRows/rowsPerPage);

    return(
        <div className="flex justify-between h-6 sm:px-6 lg:px-8 items-center">
            <p className="text-base text-gray-700">
                Showing <span className="font-medium">{firstRowIndex+1}</span> to <span className="font-medium">{(totalRows<firstRowIndex+rowsPerPage)?totalRows:firstRowIndex+rowsPerPage}</span> of{' '}
                <span className="font-medium">{totalRows}</span> results
            </p>
            <div className='flex items-center'>
                <button onClick={()=>(currentPage>1)?setCurrentPage(currentPage-1):null}><HiChevronLeft size={20}/></button>
                {(currentPage!==1)?<button className='text-md font-semibold mx-2' onClick={()=>setCurrentPage(1)}>1</button>:null}
                {currentPage-3>1?<button className='text-md font-semibold mx-2'>...</button>:null }
                {currentPage-2>1?<button className='text-md font-semibold mx-2' onClick={()=>setCurrentPage(currentPage-2)}>{currentPage-2}</button>:null}
                {currentPage-1>1?<button className='text-md font-semibold mx-2' onClick={()=>setCurrentPage(currentPage-1)}>{currentPage-1}</button>:null}
                <button className='text-md font-bold mx-2 text-secondary'>{currentPage}</button>
                {currentPage+1<finalPage?<button className='text-md font-semibold mx-2' onClick={()=>setCurrentPage(currentPage+1)}>{currentPage+1}</button>:null}
                {currentPage+2<finalPage?<button className='text-md font-semibold mx-2' onClick={()=>setCurrentPage(currentPage+2)}>{currentPage+2}</button>:null}
                {finalPage> currentPage+3?<button className='text-md font-semibold mx-2'>...</button>:null }
                {(finalPage!==1 && currentPage!==finalPage)?<button className='text-md font-semibold mx-2' onClick={()=>setCurrentPage(finalPage)}>{finalPage}</button>:null}
                <button><HiChevronRight size={20} onClick={()=>(currentPage<finalPage)?setCurrentPage(currentPage+1):null}/></button>
            </div>
        </div>
    )
}

export default TablePagination;