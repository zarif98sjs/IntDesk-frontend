import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';

import Navbar from "./navbar";

function Login(){
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
    <Navbar />
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '20vh'}}>
            <h3>Login</h3>
        </div>
        
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '10vh'}}>
            
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
    </div>
  );
};

export default Login;