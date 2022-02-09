import { GlobalStyles, darkTheme, lightTheme } from "./Components/Themes";
import { Route, Switch } from "react-router-dom";

import AllCategory from "./Pages/Category/AllCategories";
import AllExpenses from "./Pages/Expenses/AllExpenses";
import AllIncome from "./Pages/Income/AllIncome";
import AllUsers from "./Pages/Profile/AllUsers";
import ApiClient from "./Components/api";
import { CardAction } from "./Redux/Actions/CardAction";
import CreateCategory from "./Pages/Category/CreateCategory";
import CreateExpense from "./Pages/Expenses/CreateExpense";
import CreateIncome from "./Pages/Income/CreateIncome";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { FormData } from "./Pages/Search/FormData";
import Login from "./Auth/Login";
import NavBar from "./Routes/Routes";
import Settings from "./Pages/Settings/Settings";
import { SettingsAction } from "./Redux/Actions/SettingsAction";
import SignUp from "./Auth/SignUp";
import { ThemeProvider } from "styled-components";
import UpdateCategory from "./Pages/Category/UpdateCategory";
import UpdateExpense from "./Pages/Expenses/UpdateExpense";
import UpdateIncome from "./Pages/Income/UpdateIncome";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { useState } from "react";

const App = () => {
  const history = useHistory();
  const [theme, setTheme] = useState("light");
  const [getIncome, setGetIncome] = useState({});
  const [getExpense, setGetExpense] = useState({});
  const [getCategory, setGetCategory] = useState({});
  const [error, setError] = useState("");
  let getUser = JSON.parse(localStorage.getItem("userInfo"));

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  useEffect(() => {
    if (getUser) {
      CardAction();
      SettingsAction();
    } else {
      history.push("/");
    }
  }, [history, getUser]);

  const handleExpense = (id) => {
    ApiClient
      .get(`/expense/${id}/`)
      .then((res) => setGetExpense(res.data))
      .catch((error) => {
        if (error.response.status === 404) {
          setError("Error!");
        }
      });
  };

  const handleIncome = (id) => {
    ApiClient
      .get(`/income/${id}/`)
      .then((res) => setGetIncome(res.data))
      .catch((error) => {
        if (error.response.status === 404) {
          setError("Error!");
        }
      });
  };

  const handleCategory = (id) => {
    ApiClient
      .get(`/category/${id}/`)
      .then((res) => setGetCategory(res.data))
      .catch((error) => {
        if (error.response.status === 404) {
          setError("Error!");
        }
      });
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <div>
        <NavBar themeToggler={themeToggler} theme={theme} />
        <Switch>
          <Route path="/dashboard" component={() => <Dashboard />} exact />
          <Route path="/search" component={() => <FormData />} />
          <Route path="/add-expense" component={() => <CreateExpense />} />
          <Route path="/add-income" component={() => <CreateIncome />} />
          <Route path="/add-category" component={() => <CreateCategory />} />
          <Route
            path="/all-expenses"
            component={() => (
              <AllExpenses getExpense={handleExpense} error={error} />
            )}
          />
          <Route
            path="/all-income"
            component={() => (
              <AllIncome getIncome={handleIncome} error={error} />
            )}
          />
          <Route
            path="/all-category"
            component={() => (
              <AllCategory getCategory={handleCategory} error={error} />
            )}
          />
          <Route
            path="/update-expense"
            component={() => (
              <UpdateExpense getExpense={getExpense} error={error} />
            )}
          />
          <Route
            path="/update-income"
            component={() => (
              <UpdateIncome getIncome={getIncome} error={error} />
            )}
          />
          <Route
            path="/update-category"
            component={() => (
              <UpdateCategory getCategory={getCategory} error={error} />
            )}
          />
          <Route path="/users" component={() => <AllUsers />} />
          <Route path="/settings" component={() => <Settings />} />
          <Route path="/signup" component={SignUp} />
          <Route path="/" component={Login} />
        </Switch>
      </div>
    </ThemeProvider>
  );
};
export default App;
