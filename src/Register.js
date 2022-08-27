import { Button, Form, Input } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import logo from "./images/logo13.png";
import Navbar from "./Navbar/Navbar";

function Register() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  
  const onFinish = (values) => {
    console.log("Success:", values);
    console.log("Submitted");

    let postData = {
      username: values.username,
      email: values.email,
      password: values.password,
      password2: values.password2,
      first_name: values.first_name,
      last_name: values.last_name,
    };

    axios
      .post("http://localhost:8000/users/register/", postData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log((window.$log = res.data));
        setIsSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const SuccessSignUp = (
    <div>
      <Navigate to="/" />
    </div>
  );

  const renderForm = (
    <div
      style={{
        backgroundImage: `url(${logo})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "2%",
        }}
      >
        <h1>Sign Up</h1>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "2%",
        }}
      >
        <Form
          name="basic"
          labelCol={{
            span: 10,
          }}
          wrapperCol={{
            span: 20,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="First Name"
            name="first_name"
            rules={[
              {
                required: true,
                message: "Please input your first name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[
              {
                required: true,
                message: "Please input your last name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="password2"
            rules={[
              {
                required: true,
                message: "Retype your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 20,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "20vh",
        }}
      >
        <p style={{ alignItems: "center" }}>
          Already have an account? <br />
          <a href="/login">Log in here</a>
        </p>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />
      {isSubmitted ? SuccessSignUp : renderForm};
    </div>
  );
}

export default Register;
