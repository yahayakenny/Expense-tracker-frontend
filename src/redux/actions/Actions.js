import axios from 'axios';
import { BASE_URL, NET_URL, SETTINGS_URL } from '../../components/utils';
import store from '../store/store'
let getUser = JSON.parse(localStorage.getItem('userInfo'))

export const AuthAction = (username, password, history, setError) => {
    axios.post(`${BASE_URL}/users/login`,
    {
        username: username,
        password: password,  
    },
    ).then(res =>
        {   let data = res.data
            store.dispatch({ 
            type: 'VALIDATE_LOGIN',
            data: {
                name:data.name,
                token: data.token,
                isAdmin: data.isAdmin
            }
            }) 
            localStorage.setItem('userInfo', JSON.stringify(data))
            if (data){
                history.push('dashboard/')
                window.location.reload();
            }
        }
    )
    .catch((error) =>{
        if(error.response.status === 401){
            setError('Error: Invalid Credentials')
            }   
       })
}


export const CardAction = () => {
    axios.get(NET_URL, {
        headers:{
            "Content-Type": 'application/json' ,
            'Authorization':`Bearer ${getUser.token}`}
    }).then(
        res => {
            let data = res.data
            store.dispatch({
                type: 'CARD_DATA',
                data: {
                    expense: data.expense,
                    income: data.income,
                    net: data.net,
                    incomeCount: data.incomeCount,
                    expenseCount: data.expenseCount,
                    categoryCount: data.categoryCount,
                }
            })
        }
       
    ).catch(error => console.log(error))
    }

export const SettingsAction = () => {
    axios.get(SETTINGS_URL, {
    headers:{
        "Content-Type": 'application/json' ,
        'Authorization':`Bearer ${getUser.token}`}
    }).then(
        res => {
            let data =res.data[0]
            store.dispatch({
                type: 'SETTINGS_DATA',
                data: {
                    currency: data.currency,
                    limit: data.limit,
                }
            })
        }
        
    ).catch(error => console.log(error))
}
    