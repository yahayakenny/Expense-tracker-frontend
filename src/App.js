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
import CreateIncome from "./components/CreateIncome";
import UpdateIncome from "./components/UpdateIncome";
import Login from "./components/Login";
import AllUsers from "./components/AllUsers";
import { useHistory } from 'react-router';
import { useEffect } from "react";
import CreateCategory from "./components/CreateCategory";
import AllCategory from "./components/AllCategories";
import UpdateCategory from "./components/UpdateCategory";

const App = () => {
    const history = useHistory()
    const [TOKEN, getToken] = useState('');
    const [name, getName] = useState('');

    useEffect(() => {
        let getUser = JSON.parse(localStorage.getItem('userInfo'))
        if (getUser){
            history.push('/dashboard')
            getToken(getUser.token)
            getName(getUser.name)
        }
        else {
            history.push('/')
        }
    }, [history])

    const [getIncome, setGetIncome] = useState({})
    const [getExpense, setGetExpense] = useState({})
    const [getCategory, setGetCategory] = useState({})

    const handleExpense = (id) => {
         axios.get(`https://expense-tracker-yhk.herokuapp.com/api/expense/${id}/`,{
            headers:{
                "Content-Type": 'application/json' ,
                'Authorization':`Bearer ${TOKEN}`}
        }).then(
            res => 
            setGetExpense(res.data) 
        ).catch(error => console.log(error))
    }

    const handleIncome = (id) => {
         axios.get(`https://expense-tracker-yhk.herokuapp.com/api/income/${id}/`,{
            headers:{
                "Content-Type": 'application/json' ,
                'Authorization':`Bearer ${TOKEN}`}
        }).then(
            res => 
            setGetIncome(res.data) 
        ).catch(error => console.log(error))
    }

    const handleCategory= (id) => {
         axios.get(`https://expense-tracker-yhk.herokuapp.com/api/category/${id}/`,{
            headers:{
                "Content-Type": 'application/json' ,
                'Authorization':`Bearer ${TOKEN}`}
        }).then(
            res => 
            setGetCategory(res.data) 
        ).catch(error => console.log(error))
    }

    return(
        <div >
            <NavBar/>
            <Switch>
                <Route path="/dashboard" component={() => (<Dashboard TOKEN = {TOKEN} name ={name}/>)} exact /> 
                <Route path="/search" component={() => (<FormData TOKEN = {TOKEN}/>)}  />     
                <Route path="/add-expense" component={() => (<CreateExpense TOKEN = {TOKEN}/>)} />     
                <Route path="/add-income" component={() => (<CreateIncome TOKEN = {TOKEN}/>)}/>     
                <Route path="/add-category" component={() => (<CreateCategory TOKEN = {TOKEN}/>)}/>     
                <Route path="/all-expenses" component={()=> (<AllExpenses getExpense={handleExpense} TOKEN = {TOKEN}/>)}  />     
                <Route path="/all-income" component={() => (<AllIncome getIncome = {handleIncome} TOKEN = {TOKEN}/>) }  />     
                <Route path="/all-category" component={() => (<AllCategory getCategory = {handleCategory} TOKEN = {TOKEN}/>) }  />     
                <Route path="/update-expense" component={()=> (<UpdateExpense getExpense={getExpense} TOKEN = {TOKEN}/>)}  />     
                <Route path="/update-income" component={()=> (<UpdateIncome getIncome={getIncome} TOKEN = {TOKEN}/>)}  />  
                <Route path="/update-category" component={()=> (<UpdateCategory getCategory={getCategory} TOKEN = {TOKEN}/>)}  />  
                <Route path="/users" component={() => (<AllUsers TOKEN = {TOKEN}/>)}  />     
                <Route path="/" component={Login}  />     
            </Switch>
        </div>
    )
}
export default App;
