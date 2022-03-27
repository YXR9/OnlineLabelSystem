import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { Input, Row, Col, Button, Divider, Card, List, Popconfirm, Tooltip, Layout, Modal, Form, message, PageHeader, Popover } from 'antd';
import { CodeOutlined, EditOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import Navbar from '../components/Navbar';
import { setFile, setFileIndex, getAuthToken, setEncodeTaskId } from '../utils';
import { format } from "date-fns";

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

    const content = (
        <div>
            <Row>
                <Col>
                    <Button type="primary" onClick={showJoinTask} style={{ borderColor: '#FFF', background: "#FFF", color: "#af7c20"}}>加入編碼任務</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button onClick={()=>{ history.push('/addencodetask')}} style={{ borderColor: '#FFF', background: "#FFF", color: "#af7c20"}}>建立編碼任務</Button>
                </Col>
            </Row>
        </div>
        
    )

  return (
    <div className='App'>
        <Navbar/>
        <div style={{ width: "90%", margin: "0px auto", padding: "20px"}}>
        <Row>
            <Col>
                <PageHeader style={{ color: "#eee" }} title="編碼任務"/>
            </Col>
        </Row>
        <div className='App-header'>
                <Row>
                    <Col span={24}>
                        <List
                            grid={{ gutter: 16, colum: 4 }}
                            dataSource={datas}
                            renderItem={(data, index) => (
                                <List.Item>
                                <Card 
                                    style={{ margin: "10px", width: 500, fontSize: "18px", borderColor: "#56514b", borderWidth: "3px", borderRadius: "5px", color: "#56514b", background: "#fbfaf7" }} 
                                    actions={[ 
                                        <Tooltip borderRadius title="進行編碼" style={{ color: "#af7c20", borderColor: "#af7c20", borderRadius: "20px", borderWidth: "3px", background: "#d9c7a6" }}>
                                            <CodeOutlined style={{ color: "#56514b", borderColor: "#af7c20", borderRadius: "20px", borderWidth: "3px" }} onClick={() => { setFileIndex(index); setFile(data.fileId); setEncodeTaskId(data._id); history.push("/labelpage"); }}/>
                                        </Tooltip>, 
                                        <Tooltip title="編輯任務" style={{ color: "#cccac6", borderColor: "#af7c20", borderRadius: "20px", borderWidth: "3px" }}>
                                            <EditOutlined style={{ color: "#56514b", borderColor: "#af7c20", borderRadius: "20px", borderWidth: "3px" }}/>
                                        </Tooltip>,
                                        <Tooltip title="刪除任務">
                                            <Popconfirm title="確定要刪除此編碼任務嗎？">
                                                <DeleteOutlined style={{ color: "#56514b", borderColor: "#af7c20", borderRadius: "20px", borderWidth: "3px" }} />
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
                        <Modal 
                            title="加入編碼任務" 
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
                            </Form>
                            <Form.Item>
                                <Button block className="btn" htmlType="submit" type='primary' style={{ width: "150px", margin: "10px 150px 10px 10px", float: "right"}}>加入共編任務</Button>
                            </Form.Item>
                        </Modal>
                    </Col>
                </Row>
        </div>
            <Popover placement='top' content={content}>
                <Button style={{ fontFamily: "Comic Sans MS", fontSize: "50px", margin: "-20px 0px 0px 0px", textAlign: "center",padding: "0px 0px 7px 0px", float: "right", borderRadius: "50%", width: "70px", height: "70px", boxShadow: "1px 3px 5px 0px black", lineHeight: "0px", border: "0px", background: "#ae7b20", color: "#f8f7f5"}}>+</Button>
            </Popover>
        </div>
        <Footer style={{ background: "url(http://1.bp.blogspot.com/-YODKGVfWimA/VaXaz68qdRI/AAAAAAAAMFA/MZZGV1lGxd4/s1600/yellow-bg-100.jpg) #f2f0ec", color: "#af7c20", textAlign: 'center', position: "absolute", boxSizing: "border-box", bottom: "0", width: "100%", fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </div>
  )
}
