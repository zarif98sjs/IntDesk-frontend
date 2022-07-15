import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';

import Navbar from "./navbar";

function Register(){
  const onFinish = (values) => {
    console.log('Success:', values);
    console.log("Submitted");
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };



  return (
    <div>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '20vh'}}>
            <h2>Sign Up</h2>
        </div>
        
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '40vh'}}>
            
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
                label="Email"
                name="email"
                rules={[
                {
                    required: true,
                    message: 'Please input your email!',
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
                    message: 'Please input your first name!',
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
                    message: 'Please input your last name!',
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

        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <p style={{alignItems:'center'}}>
                Aleady have an account? <br />
                <a href="/login">Log in here</a>
            </p>
        </div>
    </div>
  );
};

export default Register;