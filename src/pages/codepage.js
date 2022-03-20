import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { Input, Row, Col, Button, Divider, Card, List, Popconfirm, Tooltip, Layout, Modal, Form, message } from 'antd';
import { CodeOutlined, EditOutlined, DeleteOutlined, UsergroupAddOutlined, FileAddOutlined } from '@ant-design/icons';
import Navbar from '../components/Navbar';
import { getAuthToken } from '../utils';

const { Footer } = Layout;

export default function Codepage() {
    const history = useHistory();
    const [ datas, setDatas ] = useState('');
    const [ isModalVisible, setIsModalVisible ] = useState(false);

    const url = 'http://localhost:8080/';

    useEffect(() => {
        getAllDatas();
    }, []);

    const showJoinTask = () => {
        setIsModalVisible(true);
    }

    const handleJoinTask = (fields) => {
        const userId = getAuthToken();
        const { coCode } = fields;
        const data = new FormData();
        data.append('userId', userId);
        data.append('coCode', coCode);

        console.log(userId, coCode);

        axios.post(`${url}code/coCoder`, data)
        .then((res) => {
            message.success("成功加入共編任務🎉");
            setIsModalVisible(false);
            console.log(res);
        }).catch (error => {
            message.error(error.message);
        })
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    const getAllDatas = () => {
        const userId = getAuthToken()
        axios.get(`${url}code/allEncodeTask/${userId}`)
        .then((res) => {
            // const allDatas = res.data.datas.allDatas;
            // add data to state
            setDatas(res.data);
        })
        .catch(error => console.error(`Error: ${error}`));
    }
  return (
    <div className='App'>
        <Navbar/>
        <div className='App-header'>
                <Row>
                    <Col span={24}>
                        <Button type="primary" className="add" icon={<UsergroupAddOutlined />} onClick={showJoinTask}>加入編碼任務</Button>
                        <Modal 
                            title="加入共編編碼任務" 
                            visible={isModalVisible}
                            onCancel={handleCancel}
                            footer={null}
                        >
                            <Form name='file-upload-form' onFinish={handleJoinTask}>
                                <Form.Item name="coCode">
                                    <Input
                                        name='coCode'
                                        placeholder="請輸入共編代碼" 
                                        style={{
                                            height: "75px",
                                            width: "300px",
                                            borderRadius: "10px",
                                            borderStyle: "dashed",
                                            position: "abslute",
                                            top: "50%",
                                            left: "50%",
                                            margin: "20px 0 0 -150px"
                                        }}
                                        size="large"
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button block className="btn" htmlType="submit" type='primary' style={{ width: "150px", margin: "10px 150px 10px 10px", float: "right"}}>加入共編任務</Button>
                                </Form.Item>
                            </Form>
                        </Modal>
                        <Divider orientation='left'>編碼任務</Divider>
                        <List
                            grid={{ gutter: 16, colum: 4 }}
                            dataSource={datas}
                            renderItem={(data) => (
                                <List.Item>
                                <Card 
                                    style={{ width: 320 }} 
                                    actions={[ 
                                        <Tooltip title="進行編碼">
                                            <CodeOutlined onClick={() => { history.push("/labelpage") }}/>
                                        </Tooltip>, 
                                        <Tooltip title="編輯任務">
                                            <EditOutlined/>
                                        </Tooltip>, 
                                        <Tooltip title="刪除任務">
                                            <Popconfirm title="確定要刪除此編碼任務嗎？">
                                                <DeleteOutlined />
                                            </Popconfirm>
                                        </Tooltip>
                                    ]}
                                >
                                    <Row>
                                        <Col>
                                            <div>資料名稱： {data.fileDetails[0].fileName}</div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div>共編代碼： {data.coCode}</div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div>開始時間： {data.startTime}</div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div>結束時間： {data.endTime}</div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div>目前狀態： {data.status}</div>
                                        </Col>
                                    </Row>
                                </Card>
                            </List.Item>
                            )}
                        />
                        
                        <Button className='add' onClick={()=>{ history.push('/addencodetask')}} icon={<FileAddOutlined />}>Add Task</Button>
                    </Col>
                </Row>
        </div>
        <Footer style={{ background: "url(http://1.bp.blogspot.com/-YODKGVfWimA/VaXaz68qdRI/AAAAAAAAMFA/MZZGV1lGxd4/s1600/yellow-bg-100.jpg) #f2f0ec", color: "#4b4741", textAlign: 'center', position: "absolute", boxSizing: "border-box", bottom: "0", width: "100%", fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </div>
  )
}
