import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';

export default function Login() {
    const history = useHistory();
    
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        const { account, password } = values;
        const data = new FormData();
        data.append('account', account);
        data.append('password', password);
        axios.post("http://localhost:8080/user/login", data, {
            // headers: {
            //     'Access-Control-Allow-Origin': '*',    
            //     'Access-Control-Allow-Methods': 'POST',
            //     'Content-Type': 'multipart/form-data',
            // },
        }).then (({data}) => {
            history.push('/list'); 
            message.success("Login successful~");
            console.log(data);
        }).catch (error => {
            message.error("帳號或密碼錯誤!!");
        })
    };

    return (
        <div className='App'>
            <header className='App-header'>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item>
                        <h3>會員登入</h3>
                    </Form.Item>
                    <Form.Item
                        name="account"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                        ]}
                    >
                        <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                        Forgot password
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" 
                        // onClick={() => {
                        //     history.push('/uploadpage'); 
                        // }}
                    >
                        Log in
                        </Button>
                        Or <a href="/register">register now!</a>
                    </Form.Item>
                </Form>
            </header>
        </div>
        
    )
}
