import "../../Styles/App.css";

import * as Yup from "yup";

import { BASE_URL, GET_CATEGORIES_URL } from "../../Components/utils";
import React, { useEffect, useState } from "react";

import { Formik } from "formik";
import axios from "axios";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

const ExpenseSchema = Yup.object().shape({
  name: Yup.string().required("Error: The name is required"),
  amount: Yup.number()
    .typeError("Error: The amount must be a number!")
    .required("Error : The amount is required!"),
  description: Yup.string().required("The description is required"),
  category: Yup.string().required("The category is required"),
});

const UpdateExpense = ({ getExpense }) => {
  const history = useHistory();
  const [getCategories, setGetCategories] = useState({ filtered: [] });
  let getUser = JSON.parse(localStorage.getItem("userInfo"));
  const settings = useSelector((state) => state.settings);

  useEffect(() => {
    axios
      .get(GET_CATEGORIES_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getUser.token}`,
        },
      })
      .then((res) => setGetCategories(res.data))
      .catch((error) => console.log(error));
    return () => {};
  }, [getUser.token]);

  return (
    <div>
      <div className="container">
        <div className="col-md-12 col-sm-12 mb-4 mt-5 p-4 shadow-lg expense">
          <div className="container ">
            <h5 className="text-center mb-4">Update Expense</h5>
            <Formik
              initialValues={{
                name: "",
                amount: "",
                description: "",
                category: "",
              }}
              validationSchema={ExpenseSchema}
              onSubmit={({ name, amount, description, category }) => {
                axios
                  .put(
                    `${BASE_URL}/expense/${getExpense.id}/`,
                    {
                      name: name,
                      amount: amount,
                      category: category,
                      description: description,
                    },
                    {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getUser.token}`,
                      },
                    }
                  )
                  .then((res) => console.log(res.data))
                  .catch((error) => console.log(error));
                alert("Successfully added");
                history.push("/all-expenses");
              }}
            >
              {({ values, errors, touched, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <div
                    className="form-outline mb-2 p-6"
                    style={{ width: "100%" }}
                  >
                    <label className="form-label" for="name">
                      {" "}
                      Name:{" "}
                    </label>
                    <input
                      type="text"
                      id="name"
                      defaultValue={getExpense.name}
                      name="name"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>
                  <h6 className="error">
                    {errors.name && touched.name ? (
                      <div>{errors.name}</div>
                    ) : null}
                  </h6>
                  <div
                    className="form-outline mb-2  p-6"
                    style={{ width: "100%" }}
                  >
                    <label className="form-label" for="amount">
                      {" "}
                      Amount ({settings.currency
                        ? settings.currency
                        : "£"}):{" "}
                    </label>
                    <input
                      type="text"
                      id="amount"
                      name="amount"
                      className="form-control"
                      onChange={handleChange}
                      defaultValue={getExpense.amount}
                    />
                  </div>
                  <div className="error">
                    {errors.amount && touched.amount ? (
                      <div>{errors.amount}</div>
                    ) : null}
                  </div>
                  <div className="form-outline p-6" style={{ width: "100%" }}>
                    <label className="form-label" for="description">
                      {" "}
                      Description:
                    </label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      className="form-control"
                      onChange={handleChange}
                      defaultValue={getExpense.description}
                    />
                  </div>
                  <div className="error">
                    {errors.description && touched.description ? (
                      <div>{errors.description}</div>
                    ) : null}
                  </div>
                  <div className="mt-2 mb-4 p-6">
                    <label className="form-label" for="category">
                      {" "}
                      Category:{" "}
                    </label>
                    <select
                      style={{
                        width: "100%",
                        height: "38px",
                        borderWidth: "none",
                        padding: "3px",
                      }}
                      className="form-select"
                      name="category"
                      id="category"
                      onChange={handleChange}
                      defaultValue={getExpense.category}
                    >
                      <option selected> select a category</option>
                      {getCategories.filtered.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="error">
                    {errors.category && touched.category ? (
                      <div>{errors.category}</div>
                    ) : null}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-block  mb-0 mt-4"
                    style={{
                      width: "100%",
                      color: "white",
                      backgroundColor: "rgb(213, 126, 126)",
                    }}
                  >
                    Add
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateExpense;
