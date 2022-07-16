import { Button, Form, Input, Typography } from 'antd';
import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const { Text, Link } = Typography;


function Login(){

    // React States
    const [error,setError]=useState();
    // const [errorMessages, setErrorMessages] = useState();
    const [isSubmitted, setIsSubmitted] = useState(false);
  

  
  const onFinish = async (values) => {
    
      console.log('Values:', values);
    
      // POST
      let postData = {
        'username': values.username,
        'password': values.password,
      };
    
      // use await so that next request doesn't happen until this request is done
      await axios.post('http://localhost:8000/users/login/', postData ,{headers: {
          'Content-Type' : 'application/json'
        }})
        .then(res => {
          
          console.log("AUTH TOKEN GOT: ",res.data);
          
          // set < authToken > in local stroage
          localStorage.setItem("authToken", JSON.stringify(res.data));

          // set < loggedIn > in local stroage
          localStorage.setItem("isLoggedIn", "true");

          setIsSubmitted(true);
        })
        .catch(err => {
          console.log(err);
          setError("Invalid username or password. Try Again !");
        })

      const authToken = JSON.parse(localStorage.getItem("authToken"));
      console.log("AUTH TOKEN in local storage: ",authToken);

      await axios.get("http://localhost:8000/users/details/", {
        headers: {
            'Authorization': 'Token '.concat(authToken.token)
          }
        })
        .then(res => {

          // set < user > in local storage
          console.log("Fetchd user in login", res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
        })
        .catch(err => {
          console.log(err);
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


