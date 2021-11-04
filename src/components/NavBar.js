import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

function NavBar() {
    const history = useHistory()
    let user = JSON.parse(localStorage.getItem('userInfo'))
    function capitalize(s){
        return s[0].toUpperCase() + s.slice(1);
    }
   
    const handleLogout = () => {
        localStorage.removeItem('userInfo') 
        history.push('/')
        window.location.reload();
    }

    return (
        <div>
            <nav className = "navbar navbar-expand-md navbar-dark bg-dark sticky-top">    
	            <h4 style = {{marginLeft: "25px"}}><b style = {{color: "rgb(213, 126, 126)"}}>Expense</b> <b className = "text-white">Tracker</b></h4>
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
                            <h6>
                            <li className="nav-item ">
                                <a href="# ">Welcome {capitalize(user.username)}</a>
                            </li>
                            </h6>
                            <h6>
                                <li className="nav-item">
                                    <Link to="/dashboard">Dashboard </Link> 
                                </li>
                            </h6>   
                            <h6>
                                <li className="nav-item">
                                    <Link to="/search"> Search </Link> 
                                </li>
                            </h6>  
                            <h6> 
                                    <li className ="dropdown">
                                    <a className ="dropdown-toggle" data-toggle="dropdown" href="#  ">Income
                                    <span className ="caret"></span></a>
                                    <ul className ="dropdown-menu">
                                        <h6>
                                            <li className="nav-item">
                                                <Link to="/add-income"> Add Income </Link> 
                                            </li>
                                        </h6>   
                                        <h6>
                                            <li className="nav-item">
                                                <Link to="/all-income">View Income </Link> 
                                            </li>
                                        </h6>  
                                    </ul>
                                </li> 
                            </h6>
                            <h6>
                                <li className="dropdown">
                                    <a className="dropdown-toggle" data-toggle="dropdown" href="# ">Expense
                                    <span className="caret"></span></a>
                                    <ul className="dropdown-menu">
                                        <h6>
                                            <li className="nav-item">
                                                <Link to="/add-expense"> Add Expense </Link> 
                                            </li>
                                        </h6>   
                                        <h6>
                                            <li className="nav-item">
                                                <Link to="/all-expenses">View Expenses </Link> 
                                            </li>
                                        </h6>  
                                    </ul>
                                </li> 
                            </h6>
                        {
                            user.isAdmin ? (<h6>
                                <li className="nav-item">
                                    <Link to="/users"> Users </Link> 
                                </li>
                            </h6> ) : ''
                        }
                        <h6>
                            <li className="nav-item">
                                <Link to="/logout" onClick = {handleLogout}> Logout </Link> 
                            </li>
                        </h6>   
                    </ul>) : ''
                    }
                </div>
            </nav>          
        </div>
    );
  };

  export default NavBar
