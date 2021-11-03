import { FormData } from "./components/FormData";
import { Route, Switch } from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import NavBar from "./components/NavBar";
import CreateExpense from "./components/CreateExpense";
import AllExpenses from "./components/AllExpenses";
import AllIncome from "./components/AllIncome";
import UpdateExpense from "./components/UpdateExpense";
import { useState } from "react";
import axios from "axios";
import { TOKEN } from "./components/utils";
import CreateIncome from "./components/CreateIncome";
import UpdateIncome from "./components/UpdateIncome";
import Login from "./components/Login";
import AllUsers from "./components/AllUsers";
import { useHistory } from 'react-router';
import { useEffect } from "react";

const App = () => {
    const history = useHistory()

    useEffect(() => {
        let getUser = JSON.parse(localStorage.getItem('userInfo'))
        if (getUser){
            history.push('/dashboard')
        }
        else {
            history.push('/')
        }
    }, [])

    const [getIncome, setGetIncome] = useState({})
    const [getExpense, setGetExpense] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const handleExpense = (id) => {
         axios.get(`http://127.0.0.1:8000/api/expense/${id}/`,{
            headers:{
                "Content-Type": 'application/json' ,
                'Authorization':`Bearer ${TOKEN}`}
        }).then(
            res => 
            setGetExpense(res.data) 
        ).catch(error => console.log(error))
        setIsLoading(false); 
    }

    const handleIncome = (id) => {
         axios.get(`http://127.0.0.1:8000/api/income/${id}/`,{
            headers:{
                "Content-Type": 'application/json' ,
                'Authorization':`Bearer ${TOKEN}`}
        }).then(
            res => 
            setGetIncome(res.data) 
        ).catch(error => console.log(error))
        setIsLoading(false); 
    }

    return(
        <div >
            <NavBar/>
            <Switch>
                <Route path="/dashboard" component={() => (<Dashboard/>)} exact /> 
                <Route path="/search" component={FormData}  />     
                <Route path="/add-expense" component={CreateExpense}  />     
                <Route path="/add-income" component={CreateIncome}  />     
                <Route path="/all-expenses" component={()=> (<AllExpenses getExpense={handleExpense}/>)}  />     
                <Route path="/all-income" component={() => (<AllIncome getIncome = {handleIncome}/>) }  />     
                <Route path="/update-expense" component={()=> (<UpdateExpense getExpense={getExpense}/>)}  />     
                <Route path="/update-income" component={()=> (<UpdateIncome getIncome={getIncome}/>)}  />  
                <Route path="/users" component={AllUsers}  />     
                <Route path="/" component={Login}  />     
            </Switch>
        </div>
    )
}
export default App;
