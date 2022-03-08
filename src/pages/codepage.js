import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";
import { Row, Col, Button, Divider, Card, List, Popconfirm, Tooltip } from 'antd';
import { CodeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

export default function Codepage() {
    const history = useHistory();
    const [ datas, setDatas ] = useState('');
    const columns = [
        {
            title: '資料名稱',
            dataIndex: 'status',
            width: 150,
            render: (text) => <Link to={'/labelpage'}>{text}</Link>
        },
        {
            title: '共編代碼',
            dataIndex: 'coCode'
        },
        {
            title: '開始時間',
            dataIndex: 'startTime',
            width: 150
        },
        {
            title: '結束時間',
            dataIndex: 'endTime'
        },
        // {
        //     title: '編碼狀態',
        //     dataIndex: 'status'
        // }
    ]

    const url = 'http://localhost:8080/';

    useEffect(() => {
        getAllDatas();
    }, []);

    const getAllDatas = () => {
        axios.get(`${url}code/allEncodeTask/6207e02ab0221e391b69212b`)
        .then((res) => {
            // const allDatas = res.data.datas.allDatas;
            // add data to state
            setDatas(res.data);
        })
        .catch(error => console.error(`Error: ${error}`));
    }
  return (
    <div className='App'>
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
                                            <div>資料名稱： {data.status}</div>
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
    </div>
  )
}
