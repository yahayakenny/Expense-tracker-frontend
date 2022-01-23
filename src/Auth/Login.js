import { useState} from "react";
import { useHistory } from 'react-router';
import { AuthAction } from "../Redux/Actions/AuthAction";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); 
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        AuthAction(username, password, history, setError)
        setLoading(false);
    }
    
    return (
        <div>
            <div className="container">
                <div className="col-md-12 col-sm-12 mb-4 mt-4 p-4 shadow-lg expense">
                    <div className = "container ">
                        <h5 className = "text-center mb-4">LOGIN</h5>
                        <form onSubmit = { handleSubmit}>
                            <div className="form-outline mb-2 p-6" style = {{width: '100%'}}>
                                <label className="form-label" htmlFor="name"> Username: </label>
                                <input type="text" className="form-control mb-4"  onChange = {(e) => setUsername(e.target.value)} value = {username}/>
                            </div>
                            <div className="form-outline mb-2 p-6"  style = {{width: '100%'}}>
                                <label className="form-label" htmlFor="password"> Password: </label>
                                <input type="password" className="form-control mb-4"  onChange = {(e) => setPassword(e.target.value)} value = {password}/>
                            </div>
                            <button type="submit" className="btn btn-block  mb-2 mt-2" style={{ width: '100%', color: "white", backgroundColor: "rgb(213, 126, 126)"}}>
                            {/* {
                                loading ? (<div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                                </div>): 'Login'
                            } */}
                            {
                            loading ? 'Loading...': 'Login'
                            }
                            </button>
                        </form>
                        <h6 className = "text-danger text-center mt-4">{error}</h6>
                    </div>   
                </div>
            </div> 
        </div>
    )
}

export default Login;
