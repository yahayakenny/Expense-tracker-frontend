import './App.css'
import {  useState} from 'react'
import Pagination from './Pagination'
import { commas } from './utils';

export const FetchExpenses = ({data, error}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage] = useState(10)
    const indexOfLastData = currentPage * dataPerPage
    const indexOfFirstData = indexOfLastData - dataPerPage
    const currentData = data.filtered.slice(indexOfFirstData, indexOfLastData)
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div>
            <div className= "container"> 
                { error && <div className="text-danger text-center container mb-2">{error}</div> 
                }
                <table className="table" >
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Amount</th>
                        </tr>
                    </thead>
                    { currentData ?
                    currentData.map(item => {
                    return(
                        <tbody>
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>£{item ? commas(item.amount) : item.amount}</td>
                            </tr> 
                        </tbody>)
                    }) :''
                    }
                    <Pagination totalData={data.filtered.length} dataPerPage={dataPerPage} paginate={paginate}/>
                </table>
            </div>
        </div>
    ) 
}

