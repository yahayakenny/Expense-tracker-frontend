import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router';
import { Formik,} from 'formik';
import * as Yup from 'yup';
import './App.css';
import {ADD_INCOME_URL, TOKEN } from './utils';

const IncomeSchema = Yup.object().shape({
    name: Yup.string().required('Error: The name is required'),
    amount: Yup.number()
    .typeError('Error: The amount must be a number!')
    .required('Error : The amount is required!'),
    description: Yup.string().required('The description is required'),
  });

const CreateIncome = () => {
    const history = useHistory();

    return (
        <div>
            <div className="container">
                <div className="col-md-12 col-sm-12 mb-4 mt-5 p-4 shadow-lg expense">
                    <div className = "container ">
                        <h5 className = "text-center mb-4">Add Income</h5>
                        <Formik initialValues = {{
                                name: '',
                                amount: '',
                                description: ''
                            }}
                            validationSchema = {IncomeSchema}
                            onSubmit = {
                                ({name, amount, description}) => {
                                    axios.post(ADD_INCOME_URL,
                                        {
                                                name: name,
                                                amount:amount,
                                                description: description
                                            },
                                            {headers:{
                                                "Content-Type": 'application/json' ,
                                                'Authorization':`Bearer ${TOKEN}`
                                            }}
                            
                                        ).then(res => 
                                            console.log(res.data)  
                                        )
                                        .catch((error) => console.log(error)
                                        )
                                    alert('Income Successfully added') 
                                        history.push('/all-income')            
                                }
                            }
                        >
                            {({values, errors, touched, handleChange, handleBlur, handleSubmit}) => (
                                <form onSubmit = {handleSubmit}>
                                    <div className="form-outline mb-2 p-6" style = {{width: '100%'}}>
                                        <label className="form-label" for="name"> Name: </label>
                                        <input type="text" id="name"  name = "name" className="form-control" onChange = {handleChange} value = {values.name}/>
                                    </div>
                                    <h6 className = "error">
                                        {errors.name && touched.name ? (<div>{errors.name}</div>) : null}
                                    </h6>
                                   
                                    <div  className="form-outline mb-2  p-6"  style = {{width: '100%'}}>
                                        <label className="form-label" for="amount"> Amount (pounds): </label>
                                        <input type="text" id="amount"  name = "amount" className="form-control" onChange = {handleChange} value = {values.amount} />
                                    </div>
                                    <div className="error">
                                        {errors.amount && touched.amount ? (<div>{errors.amount}</div>) : null} 
                                    </div>
                                    <div className="form-outline p-6"  style = {{width: '100%'}}>
                                        <label className="form-label" for="description"> Description:</label>
                                        <input type="text" id="description" name = "description" className="form-control" onChange = {handleChange} value = {values.description} />
                                    </div>
                                    <div className = "error">
                                        {errors.description && touched.description ? (<div>{errors.description}</div>) : null}
                                    </div>
                                    <button type="submit" className="btn btn-block  mb-0 mt-4" style={{ width: '100%', color: "white", backgroundColor: "rgb(213, 126, 126)"}}>Add</button>
                                </form>
                            )} 
                        </Formik>
                    </div>   
                </div>
            </div> 
        </div>
    )
}

export default CreateIncome;

