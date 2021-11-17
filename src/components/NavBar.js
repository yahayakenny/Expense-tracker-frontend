import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import logo from '../images/logo.png'
import '../css/App.css'

function NavBar({themeToggler, theme}) {
    const history = useHistory()
    let user = JSON.parse(localStorage.getItem('userInfo'))
   
    const handleLogout = () => {
        localStorage.removeItem('userInfo') 
        history.push('/')
        window.location.reload();
    }

    return (
        <div>
            <nav className = "navbar navbar-expand-md navbar-dark bg-dark sticky-top">
	            <Link to= "/dashboard" > <img src = {logo} className = "logo " alt = ""/></Link>
	                <button
	                type="button"
	                className="navbar-toggler"
	                data-toggle="collapse"
	                data-target="#navbarResponsive"
                    >
                    <span className = "navbar-toggler-icon"></span>
                   </button>
                <div className="collapse navbar-collapse" id = "navbarResponsive">
                    {
                        user  ? (
                        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                                <li className="nav-item">
                                    <Link to="/dashboard">Dashboard </Link> 
                                </li>
                                <li className="nav-item">
                                    <Link to="/search"> Search </Link> 
                                </li>
                                 <li className ="dropdown">
                                    <a className ="dropdown-toggle" data-toggle="dropdown" href="#  " >Income 
                                    <span className ="caret"></span></a>
                                    <ul className ="dropdown-menu">
                                        <li className="nav-item">
                                            <Link to="/add-income"> Add Income </Link> 
                                        </li>
                                    
                                    
                                        <li className="nav-item">
                                            <Link to="/all-income">View Income </Link> 
                                        </li>
                                    </ul>
                                </li> 
                                <li className ="dropdown">
                                    <a className ="dropdown-toggle" data-toggle="dropdown" href="#  " >
                                        Category
                                    <span className ="caret"></span></a>
                                    <ul className ="dropdown-menu">
                                       
                                            <li className="nav-item">
                                                <Link to="/add-category"> Add Category </Link> 
                                            </li>
                                       
                                       
                                            <li className="nav-item">
                                                <Link to="/all-category">View Categories </Link> 
                                            </li>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <a className="dropdown-toggle" data-toggle="dropdown" href="# ">Expense
                                    <span className="caret"></span></a>
                                    <ul className="dropdown-menu">
                                       
                                            <li className="nav-item">
                                                <Link to="/add-expense"> Add Expense </Link> 
                                            </li>
                                       
                                       
                                            <li className="nav-item">
                                                <Link to="/all-expenses">View Expenses </Link> 
                                            </li>
                                       
                                    </ul>
                                </li> 
                                {
                                    user.isAdmin ? (
                                        <li className="nav-item">
                                            <Link to="/users"> Users </Link> 
                                        </li>
                                     ) : ''
                                }
                                <li className="nav-item">
                                    <Link to="/settings" > Settings </Link> 
                                </li>
                                <li className="nav-item">
                                    <Link to="/logout" onClick = {handleLogout}> Logout </Link> 
                                </li>
                                <li className="nav-item">
                                    <button className = 'btn-toggle' onClick={() => themeToggler()}>{theme === 'dark' ? <i className="fas fa-sun"></i>: <i className="fas fa-moon"></i> }</button>
                                </li>
                    </ul>) : ''
                    }
                </div>
            </nav>          
        </div>
    );
  };

  export default NavBar
