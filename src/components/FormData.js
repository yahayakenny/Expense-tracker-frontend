import React, {useState} from 'react'
import axios from 'axios';
import { FetchExpenses } from './FetchExpenses';
import { DATE_RANGE_URL, TOKEN } from './utils';

export const FormData = () => {
    const [from_date, setFromDate] = useState('')
    const [to_date, setToDate] = useState('')
    const [select, setSelect] = useState('')
    const [data, setData] = useState({ filtered: [] })
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault() 
        axios.get(DATE_RANGE_URL, {
            params: {
                from_date: from_date,
                to_date: to_date,
                select: select
            },
            headers:{
                "Content-Type": 'application/json' ,
                'Authorization':`Bearer ${TOKEN}`}

        }).then(res => {
                setData(res.data)  
                if (res.data.filtered.length === 0){
                    setError('No results found')
                    alert('No result found')
                }   
            }   
        )
        .catch((error) => {
                if(error.response.status === 404){
                    setError('Invalid parameters')
                    alert('Invalid parameters')
                }  
            }
        )     
    }
    return (
        <div className="container">
            <div class="row">
                <div class="col-md-4 col-sm-12 mb-4 mt-4 shadow-lg">
                    <div class="container">
                        <form onSubmit = {handleSubmit}>
                            <div class="form-outline mb-4" style = {{width: '100%'}}>
                                <label class="form-label" for="from_date" >From:</label>
                                <input type="date" id="from_date" class="form-control" onChange = {(e) => setFromDate(e.target.value)} value = {from_date}/>
                            </div>
                            <div class="form-outline mb-4"  style = {{width: '100%'}}>
                                <label class="form-label" for="to_date">To:</label>
                                <input type="date" id="to_date" class="form-control" onChange = {(e) => setToDate(e.target.value)} value = {to_date}/>
                            </div>
                            <br></br>
                            <select style={{width:'100%', height: '38px', borderWidth: 'none', padding: "3px"}}className="form-select" value={select} onChange = {(e) => setSelect(e.target.value)}>
                                <option selected>Select an option</option>
                                <option value="income">Income</option>
                                <option value="expense">Expense</option> 
                            </select>
                            <br></br><br></br>
                            <button type="submit" class="btn btn-block mb-4" style={{ width: '100%', color: "white", backgroundColor: "rgb(213, 126, 126)"}}>Search</button>
                        </form>
                    </div>
                </div>
                <div class="col-md-8 col-sm-12 mb-4 mt-4">
                    <div class = "container">
                        <FetchExpenses data = {data} error = {error}/> 
                    </div>
                </div>
            </div>
        </div> 
    )
}
