import React from "react";
import { Form, Input , message, Upload, Select, Button, InputNumber, DatePicker, Row, Col } from 'antd';
import Navbar from "./Navbar";

const Details = ({ prevStep, nextStep, handleChange, values }) => {
    
    const Prev = e => {
        e.preventDefault();
        prevStep();
    }

    const Next = e => {
        e.preventDefault();
        nextStep();
    }
    
    return (
        // <div className='App'>
        //     <Navbar/>
        //     <div style={{ width: "90%", margin: "0px auto", padding: "20px"}}>
        //         <header className='App-header' style={{ margin: "100px 0px"}}>
                    <Form>
                        <Form.Item 
                            name="collector" 
                            label="蒐集者姓名" 
                            hasFeedback
                            rules={[{ require: true, message: "Please enter collector" },]}
                        >
                            <Input name='collector' value={values.collector} onChange={handleChange('collector')}/>
                        </Form.Item>
                        <Form.Item
                            name="sourceTarget"
                            label="來源對象"
                            hasFeedback
                            rules={[{ required: true, message: '請填寫來源對象！' }]}
                        >
                            <Select onChange={handleChange('sourceTarget')} value={values.sourceTarget}>
                                <Select.Option value="elementarySchool">國小</Select.Option>
                                <Select.Option value="secondary">國中</Select.Option>
                                <Select.Option value="highSchool">高中</Select.Option>
                                <Select.Option value="university">大學</Select.Option>
                                <Select.Option value="graduateSchool">研究所</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="headCounts"
                            label="人數"
                            rules={[{ required: true, message: '請填寫人數！' }]}
                        >
                            <InputNumber min={1} max={1000} onChange={handleChange('headCounts')} value={values.headCounts} style={{ width: "100%" }}/>
                        </Form.Item>
                        <Form.Item
                            name="collectDate"
                            label="蒐集日期"
                            validateStatus="success"
                            rules={[{ required: true, message: '請選擇資料蒐集日期！' }]}
                        >
                            <DatePicker style={{ width: '100%' }} onChange={handleChange('collectDate')} />
                        </Form.Item>
                        <Form.Item 
                            name="collectMethod" 
                            label="蒐集方式" 
                            hasFeedback
                            rules={[{ required: true, message: '請填寫收集方式！' }]}
                            // style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                        >
                            <Select name='collectMethod' onChange={handleChange('collectMethod')} value={values.collectMethod}>
                                <Select.Option value="elementarySchool">錄音/錄影</Select.Option>
                                <Select.Option value="secondary">線上即時討論</Select.Option>
                                <Select.Option value="highSchool">線上論壇</Select.Option>
                                <Select.Option value="university">紙本資料</Select.Option>
                                <Select.Option value="other">其他</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="context"
                            label="學習情境（任務）"
                            rules={[
                              {
                                required: true,
                                message: 'Please input Intro',
                              },
                            ]}
                        >
                            <Input.TextArea showCount maxLength={100} value={values.context} onChange={handleChange('context')} />
                            <br/>
                            <h6 style={{ textAlign: "left", color: "gray" }}>學習情境（任務）撰寫例子：老師請學生線上討論，或者讓學生參與課堂活動並寫學習單。</h6>
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={ Prev }>上一步</Button>
                            <Button onClick={ Next }>下一步</Button>
                        </Form.Item>
                    </Form>
        //         </header>
        //     </div>
        // </div>
    )
}

export default Details