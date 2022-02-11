import React, { useState } from 'react';
import { Form, Input, InputNumber, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';

export default function register() {
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
    };
  return (
    <div className='App'>
        <header className='App-header'>
            <Form
                {...formItemLayout}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
            >
                <Form.Item>
                    <h3>會員註冊</h3>
                </Form.Item>
                <Form.Item
                  name="username"
                  label="使用者名稱"
                  rules={[
                    {
                      required: true,
                      message: '請輸入使用者名稱!',
                      whitespace: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="place"
                  label="所屬單位"
                  rules={[
                    {
                      required: true,
                      message: '請輸入所屬單位!',
                      whitespace: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="account"
                  label="帳號"
                  rules={[
                    {
                      required: true,
                      message: '請輸入帳號!',
                      whitespace: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                   name="password"
                   label="設定密碼"
                   rules={[
                     {
                       required: true,
                       message: '請輸入密碼!',
                     },
                   ]}
                   hasFeedback
                >
                   <Input.Password />
                </Form.Item>
               
                <Form.Item
                    name="confirm"
                    label="請再輸入一次密碼"
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
                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                      }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      Register
                    </Button>
                        Or <a href="/">login now!</a>
                </Form.Item>
            </Form>
        </header>
    </div>
  )
}
