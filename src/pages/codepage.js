import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { Input, Row, Col, Button, Divider, Card, List, Popconfirm, Tooltip, Layout, Modal, Form, message, PageHeader, Popover, Skeleton } from 'antd';
import { CodeOutlined, EditOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import Navbar from '../components/Navbar';
import { setFile, setFileIndex, getAuthToken, setEncodeTaskId } from '../utils';
import InfiniteScroll from 'react-infinite-scroll-component';

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
        <div style={{ margin: "0px auto", padding: "50px 380px", height: "850px" }}>
        
            <Row>
                <Col span={5}>
                    <h2>建立的編碼任務</h2>
                </Col>
                <Col span={5} offset={10}>
                {/* <Popover placement='top' content={content}> */}
                    <Button onClick={()=>{ history.push('/addencodetask')}} style={{ fontFamily: "Comic Sans MS", fontSize: "16px", margin: "0px 0px 0px 0px", textAlign: "center", padding: "0px 0px 7px 0px", float: "right", borderRadius: "5px", width: "150px", height: "50px", boxShadow: "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px", lineHeight: "50px", border: "0px", background: "#00bdff", color: "#f8f7f5" }}>建立編碼任務</Button>
                {/* </Popover> */}
                </Col>
                <Col span={4}>
                    <Button type="primary" onClick={showJoinTask} style={{ fontFamily: "Comic Sans MS", fontSize: "16px", margin: "0px 0px 0px 0px", textAlign: "center", padding: "0px 0px 7px 0px", float: "right", borderRadius: "5px", width: "150px", height: "50px", boxShadow: "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px", lineHeight: "50px", border: "0px", background: "#00bdff", color: "#f8f7f5" }}>加入編碼任務</Button>
                </Col>
            </Row>
            <Divider/>
            <div 
                id="scrollableDiv"
                style={{
                    margin: "30px auto",
                    height: "230px",
                    overflow: 'auto',
                    // display: 'flex',
                    // flexDirection: 'column-reverse',
                    // padding: '0 16px',
                    // justifyItems: 'center'
                }}
            >
            <Row>
                <Col>
                <InfiniteScroll
                    dataLength={datas.length}
                    next={getAllDatas}
                    hasMore={datas.length < 10}
                    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                    endMessage={<Divider plain>沒有更多的編碼任務ㄌ 🤐</Divider>}
                    scrollableTarget="scrollableDiv"
                    // style={{ margin: '0px auto'}}
                >
                    <List
                        grid={{ 
                            // gutter: ,
                            // sm: 2, 
                            column: 1
                        }}
                        dataSource={datas}
                        renderItem={(data, index) => (
                            <List.Item >
                            <Card 
                                style={{ margin: "10px", fontSize: "18px", borderRadius: "15px", color: "#002339", background: "#fff", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
                                actions={[
                                    <Tooltip borderRadius title="進行編碼" style={{ color: "#af7c20", borderColor: "#af7c20", borderRadius: "20px", borderWidth: "3px", background: "#d9c7a6" }}>
                                        <CodeOutlined style={{ color: "#006288", borderColor: "#af7c20", borderRadius: "20px", borderWidth: "3px" }} onClick={() => { setFileIndex(index); setFile(data.fileId); setEncodeTaskId(data._id); history.push("/labelpage"); }}/>
                                    </Tooltip>, 
                                    <Tooltip title="編輯任務" style={{ color: "#cccac6", borderColor: "#af7c20", borderRadius: "20px", borderWidth: "3px" }}>
                                        <EditOutlined style={{ color: "#006288", borderColor: "#af7c20", borderRadius: "20px", borderWidth: "3px" }}/>
                                    </Tooltip>,
                                    <Tooltip title="刪除任務">
                                        <Popconfirm title="確定要刪除此編碼任務嗎？">
                                            <DeleteOutlined style={{ color: "#006288", borderColor: "#af7c20", borderRadius: "20px", borderWidth: "3px" }} />
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
                            </Card>
                        </List.Item>
                        )}
                    />
                </InfiniteScroll>
                    
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
        <Row>
                <Col span={5}>
                    <h2>結束的編碼任務</h2>
                </Col>
            </Row>
            <Divider/>
            <div 
                id="scrollableDiv"
                style={{
                    margin: "30px auto",
                    height: "230px",
                    overflow: 'auto',
                    // display: 'flex',
                    // flexDirection: 'column-reverse',
                    // padding: '0 16px',
                    // justifyItems: 'center'
                }}
            >
            <Row>
                <Col>
                <InfiniteScroll
                    dataLength={datas.length}
                    next={getAllDatas}
                    hasMore={datas.length < 10}
                    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                    endMessage={<Divider plain>沒有更多的編碼任務ㄌ 🤐</Divider>}
                    scrollableTarget="scrollableDiv"
                    // style={{ margin: '0px auto'}}
                >
                    <List
                        grid={{ 
                            // gutter: ,
                            // sm: 2, 
                            column: 1
                        }}
                        dataSource={datas}
                        renderItem={(data, index) => (
                            <List.Item >
                            <Card 
                                style={{ margin: "10px", fontSize: "18px", borderRadius: "15px", color: "#002339", background: "#fff", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }} 
                                actions={[
                                    <Tooltip borderRadius title="下載編碼任務" style={{ color: "#af7c20", borderColor: "#af7c20", borderRadius: "20px", borderWidth: "3px", background: "#d9c7a6" }}>
                                        <DownloadOutlined style={{ color: "#006288", borderColor: "#af7c20", borderRadius: "20px", borderWidth: "3px" }}/>
                                    </Tooltip>
                                ]}
                            >
                                <Row>
                                    <Col>
                                        <div>資料名稱： {data.fileDetails[0].fileName}</div>
                                    </Col>
                                </Row>
                            </Card>
                        </List.Item>
                        )}
                    />
                </InfiniteScroll>
                    
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
        </div>
        <Footer style={{ background: "#000406", color: "#5f8497", textAlign: 'center', position: "absolute", boxSizing: "border-box", bottom: "0", width: "100%", fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </div>
  )
}
