import React from "react";
import "../Styles/Sign.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password should contain atleast one Uppercase")
    .required("Required"),
});

const initialValues = {
  email: "",
  password: "",
};

const Sign = () => {
  const nav = useNavigate();
  const handleSubmit = (values) => {
    console.log(values);
    nav("/product");
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="form">
          <h3 className="login">Login</h3>
          <div className="email">
            <label htmlFor="email">Email</label>
            <Field
              type="email"
              id="email"
              name="email"
              className="email-input"
            />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <div className="password">
            <label htmlFor="password">Password</label>
            <Field
              type="password"
              id="password"
              name="password"
              className="password-input"
            />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <div className="submit">
            <Button type="submit" className="mx-5">
              Submit
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Sign;
