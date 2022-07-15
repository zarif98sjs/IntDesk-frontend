import { Button, Checkbox, Form, Input, Typography } from 'antd';
import React, { useState } from "react";
import {  Navigate } from "react-router-dom";
import axios from "axios";

const { Text, Link } = Typography;


function Login(){

    // React States
    const [error,setError]=useState();
    // const [errorMessages, setErrorMessages] = useState();
    const [isSubmitted, setIsSubmitted] = useState(false);
  

  

  const onFinish = (values) => {
    console.log('Success:', values);
    // console.log(values.username);
    // console.log(values.password);

    // // Find user login info
    // const userData = database.find((user) => user.username === values.username);
    // // console.log(userData);

    // // Compare user info
    //   if (userData) {
    //     if (userData.password !== values.password) {
    //       // Invalid password
    //       console.log("invalid password");
    //       setError(errors.pass);
    //       // setErrorMessages({ name: "pass", message: errors.pass});
    //     } 
    //     else {
    //       setError(null);
    //       setIsSubmitted(true);
    //     }
    //   } 
    //   else {
    //     // Username not found
    //     console.log("user not found");
    //     console.log(errors);
    //     setError(errors.uname);
    //     // setErrorMessages("user not found ");
    //     // setErrorMessages({ name: "uname", message: errors.uname });
    //   }

      // POST
    let postData = {
      'username': values.username,
      'password': values.password,
    };
    
    axios.post('http://localhost:8000/users/login/', postData ,{headers: {
        'Content-Type' : 'application/json'
      }})
      .then(res => {
        console.log(window.$log = res.data);
        setIsSubmitted(true);
      })
      .catch(err => {
        console.log(err);
        setError("Invalid username or password. Try Again !");
      })

  };

  

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const renderForm = (
    <div>
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '25vh'}}>
            <h2>Login</h2>
        </div>
        
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '5vh'}}>
            
            <Form name="basic"
            labelCol={{
                span: 8,
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
                    message: 'Please input your username!',
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
                    message: 'Please input your password!',
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
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '25vh'}}>
          {error?<Text type="danger">{error}</Text>:null} 
        </div>
    </div>
  );

  const SuccessLogin = (
    <div>
      <Navigate to="/profile" />
    </div>
  );



  return (
    <div>
        {isSubmitted ? SuccessLogin : renderForm};
      </div>

  
  );
};

export default Login;


