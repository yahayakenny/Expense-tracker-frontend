import axios from 'axios';
import { BASE_URL } from '../../components/utils';
import store from '../store/store'

export const AuthAction = (username, password, history) => {
    axios.post(`${BASE_URL}/users/login`,
    {
        username: username,
        password: password,  
        },
    ).then(res =>
        {   store.dispatch({ 
            type: 'VALIDATE_LOGIN',
            data: {
                username: username,
                password: password,
                token: res.data.token
            }
            }) 
            if (res.data){
                history.push('dashboard/')
                window.location.reload();
            }
            localStorage.setItem('userInfo', JSON.stringify(res.data))
        }
    )
    .catch((err) => console.log(err.response))
}
 