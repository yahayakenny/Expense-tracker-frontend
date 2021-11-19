import { Formik,} from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router';
import styled from "styled-components";
import axios from 'axios';
import { SETTINGS_URL } from './utils';

const StyledApp = styled.div`
        color: ${(props) => props.theme.fontColor}
    `;

const SettingsSchema = Yup.object().shape({
    currency: Yup.string().required('Error: The currency is required'),
    limit: Yup.number()
    .typeError('Error: The spending limit must be a number!')
    .required('Error : The spending limit is required!'),
  });

const Settings = () => {
    let getUser = JSON.parse(localStorage.getItem('userInfo'))
    const history = useHistory()
    return (
        <StyledApp>
              <div className="container">
                <div className="col-md-12 col-sm-12 mb-4 mt-5 p-4 shadow-lg expense">
                    <div className = "container ">
                        <h5 className = "text-center mb-4">Settings</h5>
                        <Formik initialValues = {{
                                currency: '',
                                limit: '',
                            }}
                            validationSchema = {SettingsSchema}
                            onSubmit = {
                                ({currency, limit}) => 
                                {
                                    axios.post(SETTINGS_URL,
                                    {
                                        currency: currency,
                                        limit: limit
                                    },
                                    {headers:{
                                        "Content-Type": 'application/json' ,
                                        'Authorization':`Bearer ${getUser.token}`
                                    }}

                                    ).then(res => 
                                        console.log(res.data)  
                                        
                                    )
                                    .catch((error) => console.log(error)
                                    )
                                  
                                    alert('Settings Successfully Updated') 
                                    history.push('/dashboard')      
                                    window.location.reload();
                                }
                            }  
                        >
                            {({values, errors, touched, handleChange, handleSubmit}) => (
                                <form onSubmit = {handleSubmit}>
                                    <div className="form-outline mb-2 p-6" style = {{width: '100%'}}>
                                        <label className="form-label" for="currency"> Currency: </label>
                                        <select style={{width:'100%', height: '38px', borderWidth: 'none', padding: "3px"}} className="form-select" name = "currency" id = "currency" value={values.currency} onChange = {handleChange}> 
                                            <option selected> Select a default currency</option>
                                            <option value = '$'> Dollars </option>
                                            <option value = '£'> Pounds</option>
                                            <option value = '₦'> Naira </option>   
                                        </select>
                                    </div>
                                    <h6 className = "error">
                                        {errors.currency && touched.currency ? (<div>{errors.currency}</div>) : null}
                                    </h6>
                                    <br></br>
                                    <div className="form-outline mb-2 p-6" style = {{width: '100%'}}>
                                        <label className="form-label" for="limit"> Spending Limit: </label>
                                        <input type="text" id="limit"  name = "limit" className="form-control" onChange = {handleChange} value = {values.limit}/>
                                    </div>
                                    <h6 className = "error">
                                        {errors.limit && touched.limit ? (<div>{errors.limit}</div>) : null}
                                    </h6>
                                    <button type="submit" class="btn btn-block  mb-0 mt-4" style={{ width: '100%', color: "white", backgroundColor: "rgb(213, 126, 126)"}}>Setup</button>
                                </form>
                            )} 
                        </Formik>
                    </div>   
                </div>
            </div> 
        </StyledApp>
    )
}

export default Settings;
