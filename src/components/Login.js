import axios from "axios";
import { useState} from "react";
import { TOKEN } from "./utils";
import { useHistory } from 'react-router';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); 
    const [userData, setUserData] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const history = useHistory()

    const handleUsername = (e) => {
        setUsername(e.target.value)
     }
 
     const handlePassword = (e) => {
        setPassword(e.target.value)
     }
 
     const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://127.0.0.1:8000/api/users/login',
        {
            username: username,
            password: password,  
            },
            {headers:{
                "Content-Type": 'application/json' ,
                'Authorization':`Bearer ${TOKEN}`
            }}

        ).then(res =>
            {
                setUserData(res.data)
                localStorage.setItem('userInfo', JSON.stringify(res.data))
            }
        )
        .catch((error) => {
            if(error.response.status == 401){
                setError('Error: Invalid Credentials')
                }   
            }  
        )
        .finally(() => {
            setIsLoading(false)
        })
        if (userData){
            history.push('/dashboard')
        }
    }
    return (
        <div>
            <div className="container">
                <div className="col-md-12 col-sm-12 mb-4 mt-4 p-4 shadow-lg expense">
                    <div className = "container ">
                        <h5 className = "text-center mb-4">LOGIN</h5>
                        <form onSubmit = {handleSubmit}>
                            <div className="form-outline mb-2 p-6" style = {{width: '100%'}}>
                                <label className="form-label" for="name"> Username: </label>
                                <input type="text" class="form-control mb-4"  onChange = {handleUsername} value = {username}/>
                            </div>
                            <div className="form-outline mb-2  p-6"  style = {{width: '100%'}}>
                                <label className="form-label" for="password"> Password: </label>
                                <input type="password" class="form-control mb-4"  onChange = {handlePassword} value = {password}/>
                            </div>
                            <button type="submit" class="btn btn-block  mb-2 mt-2" style={{ width: '100%', color: "white", backgroundColor: "rgb(213, 126, 126)"}}>Login</button>
                        </form>
                        <h6 className = "text-danger text-center mt-4">{error}</h6>
                    </div>   
                </div>
            </div> 
        </div>
    )
}

export default Login;


