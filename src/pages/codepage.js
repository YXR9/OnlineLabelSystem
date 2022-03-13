import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { Row, Col, Button, Divider, Card, List, Popconfirm, Tooltip, Layout } from 'antd';
import { CodeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Navbar from '../components/Navbar';
import { getAuthToken } from '../utils';

const { Footer } = Layout;

export default function Codepage() {
    const history = useHistory();
    const [ datas, setDatas ] = useState('');

    const url = 'http://localhost:8080/';

    useEffect(() => {
        getAllDatas();
    }, []);

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
                                </Card>
                            </List.Item>
                            )}
                        />
                        
                        <Button className='add' onClick={()=>{ history.push('/addencodetask')}}>add</Button>
                    </Col>
                </Row>
        </div>
        <Footer style={{ background: "url(http://1.bp.blogspot.com/-YODKGVfWimA/VaXaz68qdRI/AAAAAAAAMFA/MZZGV1lGxd4/s1600/yellow-bg-100.jpg) #f2f0ec", color: "#4b4741", textAlign: 'center', position: "absolute", boxSizing: "border-box", bottom: "0", width: "100%", fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </div>
  )
}
