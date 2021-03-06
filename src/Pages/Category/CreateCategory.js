import "../../Styles/App.css";

import * as Yup from "yup";

import  ApiClient from "../../Components/api";
import { Formik } from "formik";
import styled from "styled-components";
import { useHistory } from "react-router";

const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`;

const CategorySchema = Yup.object().shape({
  name: Yup.string().required("Error: The name is required"),
});

const CreateCategory = ({ TOKEN }) => {
  const history = useHistory();
  return (
    <StyledApp>
      <div className="container">
        <div className="col-md-12 col-sm-12 mb-4 mt-5 p-4 shadow-lg expense">
          <div className="container ">
            <h5 className="text-center mb-4">Add Category</h5>
            <Formik
              initialValues={{
                name: "",
              }}
              validationSchema={CategorySchema}
              onSubmit={({ name }) => {
                ApiClient.post("/category/", {
                  name: name,
                })
                  .then((res) => console.log(res.data))
                  .catch((error) => console.log(error));

                alert("Category Successfully added");
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
                      value={values.name}
                    />
                  </div>
                  <h6 className="error">
                    {errors.name && touched.name ? (
                      <div>{errors.name}</div>
                    ) : null}
                  </h6>
                  <button
                    type="submit"
                    class="btn btn-block  mb-0 mt-4"
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
    </StyledApp>
  );
};

export default CreateCategory;
