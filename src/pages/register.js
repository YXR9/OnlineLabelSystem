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
        <header className='App-register-header'>
            <Form
                {...formItemLayout}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
            >
                <Form.Item>
                    <h3  style={{ color: '#9DB7C7', fontFamily: 'Comic Sans MS', fontSize: "30px"}}>OnlineLabelSystem</h3>
                </Form.Item>
                {/* <Form.Item
                  name="name"
                  label="??????"
                  rules={[
                    {
                      required: true,
                      message: '???????????????!',
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
                      message: '?????????e-mail!',
                      whitespace: true,
                    },
                  ]}
                >
                  <Input 
                      prefix={<MailOutlined className="site-form-item-icon" />}
                      placeholder='e-mail'
                      style={{
                          backgroundColor: "#f0f5f8",
                          height: "75px",
                          color: "#9DB7C7",
                          borderRadius: "10px",
                          borderStyle: "solid",
                          borderWidth: "1px",
                          borderColor: "#9DB7C7"
                    }}
                    size="large"
                    bordered={false}
                  />
                </Form.Item>
                <Form.Item
                  name="account"
                  // label="??????"
                  rules={[
                    {
                      required: true,
                      message: '???????????????!',
                      whitespace: true,
                    },
                  ]}
                >
                  <Input 
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder='Username'
                      style={{
                        backgroundColor: "#f0f5f8",
                        height: "75px",
                        color: "#9DB7C7",
                        borderRadius: "10px",
                        borderStyle: "solid",
                        borderWidth: "1px",
                        borderColor: "#9DB7C7"
                  }}
                  size="large"
                  bordered={false}
                  />
                </Form.Item>
                <Form.Item
                   name="password"
                  //  label="??????"
                   rules={[
                     {
                       required: true,
                       message: '???????????????!',
                     },
                   ]}
                   hasFeedback
                >
                   <Input.Password 
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      placeholder='Password'
                      style={{
                        backgroundColor: "#f0f5f8",
                        height: "75px",
                        color: "#9DB7C7",
                        borderRadius: "10px",
                        borderStyle: "solid",
                        borderWidth: "1px",
                        borderColor: "#9DB7C7"
                      }}
                      size="large"
                      bordered={false}
                   />
                </Form.Item>
               
                <Form.Item
                    name="confirmPassword"
                    // label="????????????"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: '?????????????????????!',
                      },
                      ({ getFieldValue }) => ({
                            validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('??????????????????'));
                        },
                      }),
                    ]}
                >
                    <Input.Password 
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      placeholder='Confirm Password'
                      style={{
                        backgroundColor: "#f0f5f8",
                        height: "75px",
                        color: "#9DB7C7",
                        borderRadius: "10px",
                        borderStyle: "solid",
                        borderWidth: "1px",
                        borderColor: "#9DB7C7"
                    }}
                    size="large"
                    bordered={false}
                    />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      ??????
                    </Button>
                    <Divider orientation='botton' style={{ color: '#9DB7C7'}}>???</Divider>
                    <a href="/">???????????????????????????</a>
                </Form.Item>
            </Form>
        </header>
    </div>
  )
}
