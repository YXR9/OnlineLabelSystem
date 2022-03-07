import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";
import { Table, Row, Col, Button, Divider } from 'antd';

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
            <div style={{ margin: "30px" }}>
                <Row>
                    <Col span={24}>
                        <Divider orientation='left'>編碼任務</Divider>
                        <Table columns={columns} dataSource={datas} pagination={{ pageSize: 5 }} scroll={{ y: 250 }}/>
                            <Button className='add' onClick={()=>{ history.push('/addencodetask')}}>add</Button>
                    </Col>
                </Row>
            </div>
            
        </div>
    </div>
  )
}
