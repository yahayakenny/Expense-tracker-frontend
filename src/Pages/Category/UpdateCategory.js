import "../../Styles/App.css";

import * as Yup from "yup";

import ApiClient from "../../Components/api";
import { Formik } from "formik";
import React from "react";
import { useHistory } from "react-router";

const CategorySchema = Yup.object().shape({
  name: Yup.string().required("Error: The name is required"),
});

const UpdateCategory = ({ getCategory }) => {
  const history = useHistory();

  return (
    <div>
      <div className="container">
        <div className="col-md-12 col-sm-12 mb-4 mt-5 p-4 shadow-lg expense">
          <div className="container ">
            <h5 className="text-center mb-4">Update Category</h5>
            <Formik
              initialValues={{
                name: "",
              }}
              validationSchema={CategorySchema}
              onSubmit={({ name }) => {
                ApiClient
                  .put(
                    `/category/${getCategory.id}/`,
                    {
                      name: name,
                    },
                  )
                  .then((res) => console.log(res.data))
                  .catch((error) => console.log(error));
                alert("Category Successfully updated");
                history.push("/all-category");
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
                      name="name"
                      className="form-control"
                      onChange={handleChange}
                      defaultValue={getCategory.name}
                    />
                  </div>
                  <h6 className="error">
                    {errors.name && touched.name ? (
                      <div>{errors.name}</div>
                    ) : null}
                  </h6>
                  <button
                    type="submit"
                    className="btn btn-block  mb-0 mt-4"
                    style={{
                      width: "100%",
                      color: "white",
                      backgroundColor: "rgb(213, 126, 126)",
                    }}
                  >
                    Update
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

export default UpdateCategory;
