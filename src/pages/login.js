import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Form, Input, Button, Divider, message } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { setAuthToken } from "../utils";

export default function Login() {
const history = useHistory();
    const [ account, setAccount ] = useState();
    const [ password, setPassword ] = useState();
    
    async function loginUser(credentials) {
        // let history = useHistory();
        // console.log(credentials);
        return axios.post("http://localhost:8080/user/login", credentials
        )
        .then((data) => {
            setAuthToken(data.data.userInfo._id, data.data.userInfo.name)
            console.log(data.status);
            message.success("login successful 😉")
            if(data.status === 200) {
                console.log("login successful~")
                history.push('/list');
            }
        })
        .catch ((error) => {
            message.error(error.message);
        })
    }

    const onFinish = async e => {
       if (e && e.preventDefault) { e.preventDefault(); }
        const token = await loginUser({
            account,
            password
        })
        // setToken(token);
        
    };

    return (
        <div className='App'>
            <header className='App-login-header'>
                <Form
                    name="normal_login"
                    className="login-form"
                    // initialValues={{
                    //     remember: true,
                    // }}
                    onFinish={()=> onFinish()}
                >
                    <Form.Item>
                        <h3  style={{ color: '#f0f5f8', fontFamily: 'Comic Sans MS', fontSize: "30px"}}>OnlineLabelSystem</h3>
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
                        <Input 
                            name='account'
                            prefix={<UserOutlined className="site-form-item-icon" />} 
                            placeholder="Username" 
                            onChange={e => setAccount(e.target.value)}
                            style={{
                                backgroundColor: "#f0f5f8",
                                height: "75px",
                                color: "#002339",
                                borderRadius: "10px"
                            }}
                            size="large"
                            bordered={false}
                        />
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
                        <Input.Password
                            name='password'
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)}
                            style={{
                                backgroundColor: "#f0f5f8",
                                height: "75px",
                                color: "#002339",
                                borderRadius: "10px"
                            }}
                            size="large"
                            bordered={false}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登入
                        </Button>
                        <Divider orientation='botton' style={{ color: '#f0f5f8'}}>或</Divider>
                        <a href="/register">註冊一個帳號</a>
                    </Form.Item>
                </Form>
            </header>
        </div>
        
    )
}

Login.propTypes = {
    setToken: propTypes.func.isRequired
};
