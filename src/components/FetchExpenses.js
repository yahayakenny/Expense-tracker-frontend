import '../css/App.css'
import {  useState} from 'react'
import Pagination from './Pagination'
import { commas } from './utils';
import styled from "styled-components";

const StyledApp = styled.div`
        color: ${(props) => props.theme.fontColor}
    `;


export const FetchExpenses = ({data, error, settings}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage] = useState(10)
    const indexOfLastData = currentPage * dataPerPage
    const indexOfFirstData = indexOfLastData - dataPerPage
    const currentData = data.filtered.slice(indexOfFirstData, indexOfLastData)
    const paginate = pageNumber => setCurrentPage(pageNumber);
    let currency = localStorage.getItem('currency')

    return (
        <StyledApp>
            <div className= "container p-4  mb-4 shadow-lg"> 
                {
                error  &&   <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                {error}
                                 <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                 <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                } 
                <table >
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
                                <td>{settings.currency  ? settings.currency: '£'}{item ? commas(item.amount) : item.amount}</td>
                            </tr> 
                        </tbody>)
                    }) :''
                    }
                </table>
                <br></br>
                <Pagination totalData={data.filtered.length} dataPerPage={dataPerPage} paginate={paginate}/>
            </div>
        </StyledApp>
    ) 
}
