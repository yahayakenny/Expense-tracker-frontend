import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

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
	            <Link to= "/dashboard" style = {{marginLeft: "25px", fontSize: "28px" ,textDecoration: "none"}}><b style = {{color: "rgb(213, 126, 126)"}}>Expense</b> <b className = "text-white">Tracker</b></Link>
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
                                <li className="nav-item">
                                    <Link to="/dashboard"><i className= "fas fa-bookmark" style={{marginRight: "3px", color: "rgb(162, 205, 205)"}}> </i> Dashboard </Link> 
                                </li>
                            </h6>   
                            <h6>
                                <li className="nav-item">
                                    <Link to="/search"><i className= "fas fa-search" style={{marginRight: "2px", color: "rgb(162, 205, 205)"}}></i> Search </Link> 
                                </li>
                            </h6>  
                            <h6> 
                                 <li className ="dropdown">
                                    <i className= "fas fa-wallet" style={{marginRight: "2px", color: "rgb(162, 205, 205)"}}></i>
                                    <a className ="dropdown-toggle" data-toggle="dropdown" href="#  " >Income 
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
                                 <li className ="dropdown">
                                    <i className= "fas fa-layer-gr" style={{marginRight: "2px", color: "rgb(162, 205, 205)"}}></i>
                                    <a className ="dropdown-toggle" data-toggle="dropdown" href="#  " >Category
                                    <span className ="caret"></span></a>
                                    <ul className ="dropdown-menu">
                                        <h6>
                                            <li className="nav-item">
                                                <Link to="/add-category"> Add Category </Link> 
                                            </li>
                                        </h6>   
                                        <h6>
                                            <li className="nav-item">
                                                <Link to="/all-category">View Categories </Link> 
                                            </li>
                                        </h6>  
                                    </ul>
                                </li> 
                            </h6>
                            <h6>
                                <li className="dropdown">
                                <i className= "fas fa-coins" style={{marginRight: "2px", color: "rgb(162, 205, 205)"}}></i>
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
                        {/* {
                            user.isAdmin ? (<h6>
                                <li className="nav-item">
                                    <Link to="/users"> Users </Link> 
                                </li>
                            </h6> ) : ''
                        } */}
                        <h6>
                            <li className="nav-item">
                                <Link to="/logout" onClick = {handleLogout}> <i className= "fas fa-sign-out-alt" style={{marginRight: "3px", color: "rgb(162, 205, 205)"}}> </i> Logout </Link> 
                            </li>
                        </h6>   
                        <h6>
                            <li className="nav-item">
                                <button className = 'btn-toggle' onClick={() => themeToggler()}>{theme === 'dark' ? 'Light':  'Dark'}</button>
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
