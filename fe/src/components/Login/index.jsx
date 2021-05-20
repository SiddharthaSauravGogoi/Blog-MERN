import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "../../services/authService";

import { ToastContainer, toast } from "react-toastify";
import UserContext from "../../context/UserContext";

export default function Login() {
  const { setUser } = useContext(UserContext);
  const initialValues = {
    email: "",
    password: "",
  };

  const history = useHistory();

  const notify = (msg) => toast(msg);

  const onSubmit = (values) => {
    let signInUser = login(values);
    signInUser.then((response) => {
      if (response.data.error) {
        notify(response.data.error);
      } else {
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(response.data);
        history.push("/");
      }
    });
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required("Required"),
    password: Yup.string().required("No password provided."),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="form login">
          <h3 style={{ textAlign: "center " }}>Login</h3>
          <label htmlFor="email">Email</label>
          <Field type="text" id="email" name="email" placeholder="Email" />
          <ErrorMessage name="email" />

          <label htmlFor="password">Password</label>
          <Field
            type="password"
            id="password"
            name="password"
            placeholder="Email"
          />
          <ErrorMessage name="password" />

          <button type="submit" className="btn">
            {" "}
            LOGIN{" "}
          </button>
        </Form>
      </Formik>
      <ToastContainer autoClose={1500} />
    </>
  );
}
