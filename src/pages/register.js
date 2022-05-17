import React from 'react';
import { Form, Input, Button, message, Divider } from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { LockOutlined, LockTwoTone, MailOutlined, UserOutlined } from '@ant-design/icons';

export default function Register() {
    let history = useHistory();
    const formItemLayout = {
        labelCol: {
          xs: {
            span: 24,
          },
          sm: {
            span: 10,
          },
        },
        wrapperCol: {
          xs: {
            span: 24,
          },
          sm: {
            span: 30,
          },
        },
      };
    const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 5,
          },
        },
      };
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        const { name, unit, account, password, confirmPassword } = values;
        const data = new FormData();
        data.append('name', name);
        data.append('unit', unit);
        data.append('account', account);
        data.append('password', password);
        data.append('confirmPassword', confirmPassword)
        axios.post("http://localhost:8080/user/register", data, {
            // headers: {
            //     'Access-Control-Allow-Origin': '*',    
            //     'Access-Control-Allow-Methods': 'POST',
            //     'Content-Type': 'multipart/form-data',
            // },
        }).then (({data}) => {
            history.push('/')
            message.success("Register successful~");
            console.log(data);
        }).catch (error => {
            message.error(error.message);
        })
    };
  return (
    <div className='App'>
        <header className='App-login-header'>
            <Form
                {...formItemLayout}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
            >
                <Form.Item>
                    <h3  style={{ color: '#f0f5f8', fontFamily: 'Comic Sans MS', fontSize: "30px"}}>OnlineLabelSystem</h3>
                </Form.Item>
                {/* <Form.Item
                  name="name"
                  label="姓名"
                  rules={[
                    {
                      required: true,
                      message: '請輸入姓名!',
                      whitespace: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item> */}
                <Form.Item
                  name="unit"
                  rules={[
                    {
                      required: true,
                      message: '請輸入e-mail!',
                      whitespace: true,
                    },
                  ]}
                >
                  <Input 
                      prefix={<MailOutlined className="site-form-item-icon" />}
                      placeholder='e-mail'
                      style={{
                        backgroundColor: "#f0f5f8",
                        height: "70px",
                        width: "300px",
                        color: "#002339",
                        borderRadius: "10px"
                    }}
                    size="large"
                    bordered={false}
                  />
                </Form.Item>
                <Form.Item
                  name="account"
                  // label="姓名"
                  rules={[
                    {
                      required: true,
                      message: '請輸入帳號!',
                      whitespace: true,
                    },
                  ]}
                >
                  <Input 
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder='Username'
                      style={{
                        backgroundColor: "#f0f5f8",
                        height: "70px",
                        width: "300px",
                        color: "#002339",
                        borderRadius: "10px"
                  }}
                  size="large"
                  bordered={false}
                  />
                </Form.Item>
                <Form.Item
                   name="password"
                  //  label="密碼"
                   rules={[
                     {
                       required: true,
                       message: '請輸入密碼!',
                     },
                   ]}
                   hasFeedback
                >
                   <Input.Password 
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      placeholder='Password'
                      style={{
                        backgroundColor: "#f0f5f8",
                        height: "70px",
                        width: "300px",
                        color: "#002339",
                        borderRadius: "10px"
                      }}
                      size="large"
                      bordered={false}
                   />
                </Form.Item>
               
                <Form.Item
                    name="confirmPassword"
                    // label="確認密碼"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: '請輸入確認密碼!',
                      },
                      ({ getFieldValue }) => ({
                            validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('確認密碼不同'));
                        },
                      }),
                    ]}
                >
                    <Input.Password 
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      placeholder='Confirm Password'
                      style={{
                        backgroundColor: "#f0f5f8",
                        height: "70px",
                        width: "300px",
                        color: "#002339",
                        borderRadius: "10px"
                    }}
                    size="large"
                    bordered={false}
                    />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      註冊
                    </Button>
                    <Divider orientation='botton' style={{ color: '#f0f5f8'}}>或</Divider>
                    <a href="/">已經有帳戶了，登入</a>
                </Form.Item>
            </Form>
        </header>
    </div>
  )
}
