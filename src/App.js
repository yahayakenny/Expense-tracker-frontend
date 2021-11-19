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
import {ThemeProvider} from 'styled-components';
import {lightTheme, darkTheme, GlobalStyles} from './components/Themes';
import { BASE_URL } from "./components/utils";
import Settings from "./components/Settings";
import { CardAction, SettingsAction } from "./redux/actions/Actions";

const App = () => {
    const history = useHistory()
    const [theme, setTheme] = useState('light');
    const [getIncome, setGetIncome] = useState({});
    const [getExpense, setGetExpense] = useState({});
    const [getCategory, setGetCategory] = useState({});
    let getUser = JSON.parse(localStorage.getItem('userInfo'))

    const themeToggler = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
    }

    useEffect(() => {
        if (getUser){
            history.push('/dashboard')
            CardAction()
            SettingsAction()
        }
        else {
            history.push('/')
        }
    }, [history,getUser])

    const handleExpense = (id) => {
         axios.get(`${BASE_URL}/expense/${id}/`,{
            headers:{
                "Content-Type": 'application/json' ,
                'Authorization':`Bearer ${getUser.token}`}
        }).then(
            res => setGetExpense(res.data) 
        ).catch(error => console.log(error))
    }

    const handleIncome = (id) => {
         axios.get(`${BASE_URL}/income/${id}/`,{
            headers:{
                "Content-Type": 'application/json' ,
                'Authorization':`Bearer ${getUser.token}`}
        }).then(
            res => 
            setGetIncome(res.data) 
        ).catch(error => console.log(error))
    }

    const handleCategory= (id) => {
         axios.get(`${BASE_URL}/category/${id}/`,{
            headers:{
                "Content-Type": 'application/json' ,
                'Authorization':`Bearer ${getUser.token}`}
        }).then(
            res => 
            setGetCategory(res.data) 
        ).catch(error => console.log(error))
    }


    return(
        <ThemeProvider theme = {theme === 'light' ? lightTheme : darkTheme}>
            <GlobalStyles/>
            <div>
                <NavBar themeToggler = {themeToggler} theme = {theme}/>
                <Switch>
                    <Route path="/dashboard" component={() => (<Dashboard/>)} exact /> 
                    <Route path="/search" component={() => (<FormData/>)}  />     
                    <Route path="/add-expense" component={() => (<CreateExpense/>)} />     
                    <Route path="/add-income" component={() => (<CreateIncome />)}/>     
                    <Route path="/add-category" component={() => (<CreateCategory/>)}/>     
                    <Route path="/all-expenses" component={()=> (<AllExpenses getExpense={handleExpense}/>)}  />     
                    <Route path="/all-income" component={() => (<AllIncome getIncome = {handleIncome}/>) }  />     
                    <Route path="/all-category" component={() => (<AllCategory getCategory = {handleCategory}/>) }  />     
                    <Route path="/update-expense" component={()=> (<UpdateExpense getExpense={getExpense} />)}  />     
                    <Route path="/update-income" component={()=> (<UpdateIncome getIncome={getIncome} />)}  />  
                    <Route path="/update-category" component={()=> (<UpdateCategory getCategory={getCategory}/>)}  />  
                    <Route path="/users" component={() => (<AllUsers/>)}  />     
                    <Route path="/settings" component={() => (<Settings />)}  />  
                    <Route path="/" component={Login}  />  
                </Switch>
            </div>
        </ThemeProvider>
    )
}
export default App;
