import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { register } from "../../services/authService";

export default function Register() {
  const history = useHistory();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const notify = (msg) => toast(msg);

  const onSubmit = (values) => {
    let signUpUser = register(values);
    signUpUser.then((response) => {
      if (response.data.error) {
        notify(response.data.error);
      } else {
        notify(response.data);
        setTimeout(() => {
          history.push("/login");
        }, 2000);
      }
    });
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Required")
      .min(4, "Name is too short. Please do not use initials"),
    email: Yup.string().email().required("Required"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum."),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className="form signup">
        <h3 style={{ textAlign: "center " }}> Register </h3>
        <Field type="text" id="name" name="name" placeholder="Full Name" />
        <ErrorMessage name="name" />
        <Field type="text" id="email" name="email" placeholder="Email" />
        <ErrorMessage name="email" />
        <Field
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        />
        <ErrorMessage name="password" />
        <button type="submit" className="btn">
          {" "}
          Submit{" "}
        </button>
        <ToastContainer autoClose={2000} />
      </Form>
    </Formik>
  );
}
