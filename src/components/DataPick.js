import React, { useState } from "react";
import { Card, Empty, Form, Checkbox, Button, message, Layout } from "antd";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { blue } from '@ant-design/colors';
import { Header } from "antd/lib/layout/layout";
console.log(blue); // ['#E6F7FF', '#BAE7FF', '#91D5FF', '#69C0FF', '#40A9FF', '#1890FF', '#096DD9', '#0050B3', '#003A8C', '#002766']
console.log(blue.primary); // '#1890FF'

const perspective = ['安全面', '科學與技術面', '環保面', '社會面', '經濟面'];
const purpose = ['提出論點或主張(CA1)', '提出疑問(CA2)', '提出挑戰(CA3)', '進行推論(CA4)', '表達支持(CA5)', '其他(CA6)'];
const pass = ['暫時不標註']

export default function DataPick(props) {
    const [page, setPage] = useState(0);
    const [perspectiveValue, setPerspectiveValue] = useState([]);
    const [purposeValue, setPurposeValue] = useState([]);
    const [passValue, setPassValue] = useState("");

    const onChangePerspective = e => {
        console.log('perspective: ', e);
        setPerspectiveValue(e);
    }

    const onChangePurpose = e => {
        console.log('purpose: ', e);
        setPurposeValue(e);
    }

    const onChange = e => {
        console.log(e);
        setPassValue(e);
    }


    const displayDatas = (props) => {
        
        const {datas} = props;
        if(datas.length > 0) {
            console.log(datas[page]._id);
            
        const handleSave = fields => {
            const userId = "61cd8404c5f3234a331e3ac4";
            const _id = datas[page]._id;
            const version = ["1"];
            var data = JSON.stringify({
                "_id": _id,
                "history": {
                    "userId": userId,
                    "perspective":perspectiveValue,
                    "purpose": purposeValue,
                    "version": version
                }
                });
            var config = {
                method: 'post',
                url: 'http://localhost:8080/data/tagData',
                headers: { 
                  'Content-Type': 'application/json'
                },
                data : data
            };
            axios(config)
                .then(function (response) {
                    message.success("Upload successful~");
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    message.error(error.message);
                    console.log(error);
                });
        }
            return(
                <Layout className="App-header">
                    <Form
                        name="file-upload-form"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 14 }}
                        onFinish={handleSave}
                    >
                        <Form.Item
                            style={{
                                position: "absolute",
                                left: "5%",
                                top: "50%"
                            }}
                        >
                            <LeftCircleOutlined  onClick={() => setPage(page - 1)} style={{ fontSize: '50px' }} />
                        </Form.Item>
                        <Form.Item
                            style={{
                                // position: "absolute",
                                justifyContent: "center",
                                // width: "100%"
                                padding: "15px",
                                margin: "10px"
                            }}
                        >
                            <Card
                                style={{
                                    width: '100%',
                                    margin: '50px',
                                    fontFamily: "Noto Sans Mono CJK TC",
                                    fontSize: "25px",
                                }}
                            >
                                {datas[page].dataName}
                            </Card>
                        </Form.Item>
                        <Form.Item style={{
                            position: "absolute",
                            left: "90%",
                            top: "50%"
                        }}>
                            <RightCircleOutlined  onClick={() => setPage(page + 1)} style={{ fontSize: '50px' }}/>
                        </Form.Item>
                        <Form.Item name="perspective" label="論點面向" className='checkbox' style={{
                            // position: "absolute",
                            // display: "inline-flex",
                            width: "380px",
                            left: "45%",
                            top: "50%",
                            position: 'fixed',
                            fontFamily: "Noto Sans Mono CJK TC",
                            border: "1px solid rgba(156, 156, 156, 0.6)",
                            padding: "23px",
                            margin: "10px"
                        }}>
                            <Card>
                                 <Checkbox.Group options={perspective} onChange={onChangePerspective} value={perspectiveValue} style={{ display: 'grid', margin: "10px" }} />
                            </Card>
                       
                        </Form.Item>
                        <Form.Item name="purpose" label="發言目的" className='checkbox' style={{
                            // position: "absolute",
                            // display: "inline-flex",
                            width: "380px",
                            left: "20%",
                            top: "50%",
                            position: 'fixed',
                            fontFamily: "Noto Sans Mono CJK TC",
                            border: "1px solid rgba(156, 156, 156, 0.6)",
                            padding: "23px",
                            margin: "10px"
                        }}>
                        <Checkbox.Group options={purpose} onChange={onChangePurpose} value={purposeValue} style={{ display: 'grid', margin: "10px" }} />
                        </Form.Item>
                        <Form.Item name="pass" style={{
                            // position: "absolute",
                            width: "300px",
                            left: "70%",
                            top: "50%",
                            position: 'fixed',
                            fontFamily: "Noto Sans Mono CJK TC",
                            padding: "15px",
                            margin: "10px"
                            
                            // justifyContent: "center",
                        }}>
                            <Checkbox.Group options={pass} onChange={onChange} value={passValue} style={{ display: 'grid' }} ></Checkbox.Group>
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 12, offset: 6 }} style={{
                            position: "absolute",
                            left: "75%",
                            top: "80%",
                            justifyContent: "center",
                        }}>
                            <Button style={{ lineHeight: "20px", backgroundColor: "#b7eb8f", border: "rgb(255, 213, 0)", color: "rgb(132, 132, 132)", fontFamily: "Noto Sans Mono CJK TC", fontSize: "20px", fontWeight: "bolder", width: "80px", height: "40px", borderRadius: "20px"}} type="primary" htmlType="submit">Save</Button>
                        </Form.Item>
                    </Form>
                </Layout>
                
                
            )
        } else {
            return (
            <Empty
                style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%"
                    
                }} 
                description={false}
            />)
        }
    }
    
    return(
        <>
            {displayDatas(props)}
        </>
    )
}