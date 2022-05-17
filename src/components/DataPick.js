import React, { useState } from "react";
import { Card, Empty, Form, Checkbox, Button, message, Row, Col } from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom"
import Navbar from '../components/Navbar';

const perspective = ['安全面', '科學與技術面', '環保面', '社會面', '經濟面'];
const purpose = ['提出論點或主張(CA1)', '提出疑問(CA2)', '提出挑戰(CA3)', '進行推論(CA4)', '表達支持(CA5)', '其他(CA6)'];

export default function DataPick(props) {
    const history = useHistory();
    const [page, setPage] = useState(0);
    const [perspectiveValue, setPerspectiveValue] = useState([]);
    const [purposeValue, setPurposeValue] = useState([]);

    const onChangePerspective = e => {
        console.log('perspective: ', e);
        setPerspectiveValue(e);
    }

    const onChangePurpose = e => {
        console.log('purpose: ', e);
        setPurposeValue(e);
    }

    const next = () => {
        setPage(page + 1);
    };

    const prev = () => {
        setPage(page - 1);
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
            <div className="App">
                <Navbar/>
                <div className="App-header">
                    <div style={{margin: "200px",marginTop: "150px"}}>
                        <Form name="file-upload-form" onFinish={handleSave}>
                            {/* <Form.Item
                                style={{
                                    position: "absolute",
                                    left: "5%",
                                    top: "50%"
                                }}
                            >
                                <LeftCircleOutlined  onClick={() => setPage(page - 1)} style={{ fontSize: '50px' }} />
                            </Form.Item> */}
                            <Row>
                                <Col span={24}>
                                    <Form.Item>
                                        <Card
                                            style={{
                                                margin: '50px',
                                                fontSize: "25px",
                                                backgroundColor: "#f0f5f8"
                                            }}
                                        >
                                            {datas[page].dataName}
                                        </Card>
                                    </Form.Item>
                                </Col>
                            </Row>
                                        
                            {/* <Form.Item style={{
                                position: "absolute",
                                left: "90%",
                                top: "50%"
                            }}>
                                <RightCircleOutlined  onClick={() => setPage(page + 1)} style={{ fontSize: '50px' }}/>
                            </Form.Item> */}
                            <Row>
                                <Col span={8} offset={4}>
                                    <Form.Item name="perspective" className='checkbox'>
                                        <Card title="論點面向" bordered={false} style={{ marginBottom: "30px" }}>
                                            <Checkbox.Group options={perspective} onChange={onChangePerspective} value={perspectiveValue} style={{ display: "flex", flexDirection: "column" }}/>
                                        </Card>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item name="purpose" className='checkbox'>
                                        <Card title="發言目的" bordered={false} style={{ marginBottom: "30px" }}>
                                            <Checkbox.Group options={purpose} onChange={onChangePurpose} value={purposeValue} style={{ display: "flex", flexDirection: "column" }}/>
                                        </Card>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8} push={10}>
                                    <Form.Item>
                                        <Row>
                                            <Col>
                                                <Button type="primary" htmlType="submit" className="btn1" onClick={() => { history.push("/labelpage")}}>
                                                    離開編碼任務
                                                </Button>
                                            </Col>
                                            <Col>
                                                {page > 0 && (
                                                    <Button type="primary" htmlType="submit" className="btn" style={{ margin: '0 8px' }} onClick={() => prev()}>
                                                        上一筆
                                                    </Button>
                                                )}
                                            </Col>
                                            <Col>
                                                {page < datas.length - 1 && (
                                                    <Button type="primary" htmlType="submit" className="btn" style={{ margin: '0 8px' }} onClick={() => next()}>
                                                        下一筆
                                                    </Button>
                                                )}    
                                            </Col>
                                        </Row>
                                        
                                    </Form.Item>
                                </Col>
                            </Row>
                            
                        </Form>
                    </div>
                    
                </div>
            </div>    
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