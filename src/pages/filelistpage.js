import React, { useState, useEffect } from 'react';
import { Link, Route, useHistory } from 'react-router-dom';
import axios from "axios";
import { Table, Button, Layout, Row, Col, Divider, Modal } from 'antd';
import Navbar from '../components/Navbar';
import { getAuthToken } from '../utils';
import { DownloadOutlined } from '@ant-design/icons';
const { Footer } = Layout;

function info() {
    Modal.info({
        title: '注意事項',
        content: (
            <div>
                <p>1. 檔案格式必須為 Excel 格式</p>
                <p>2. Excel 檔案中的資料欄位必須遵照以下規定：</p>
                <p>2-1 'A1'必須填入'content'</p>
                <p>2-2 其餘內容必須都放置於A欄中（例如：可以放在 A2、A3、A4、A5、...）</p>
                <Button shape='round' icon={<DownloadOutlined/>}>下載範例檔案</Button>
            </div>
        ),
        okText: "開始上傳檔案",
        onOk() { setTimeout(function () {
            window.location.href = 'http://localhost:3000/uploadpage';
        }, 100); } 
    })
}

export default function Filelistpage() {
    const history = useHistory();
    const [ datas, setDatas ] = useState('');
    const columns = [
        {
            title: '資料名稱',
            dataIndex: 'fileName',
            width: 150
        },
        {
            title: '蒐集者',
            dataIndex: 'collector',
            width: 150
        },
        {
            title: '檔案說明',
            dataIndex: 'context'
        }
    ]

    const url = 'http://localhost:8080/';

    useEffect(() => {
        getAllDatas();
    }, []);

    const getAllDatas = () => {
        const userId = getAuthToken();
        // console.log(userId)
        axios.get(`${url}file/allFile/${userId}`)
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
        <div style={{ width: "60%", height: "200px", margin: "0px auto", padding: "60px 0px"}}>
                    <Row>
                        <Col span={3}>
                            <h2>資料總管</h2>
                        </Col>
                        <Col span={8} offset={13}>
                            <Button className='add' onClick={info} style={{ fontFamily: "Comic Sans MS", fontSize: "16px", margin: "0px 0px 0px 0px", textAlign: "center", padding: "0px 0px 7px 0px", float: "right", borderRadius: "5px", width: "150px", height: "50px", boxShadow: "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px", lineHeight: "50px", border: "0px", background: "#00bdff", color: "#f8f7f5" }}>上傳檔案</Button>
                        </Col>
                    </Row>
                    <Divider/>
            {/* <header className='App-header'> */}
                {/* <div style={{ height: "300px" }}> */}
                    <Table className='table' columns={columns} dataSource={datas} pagination={false} scroll={{ y: 500 }}/>
                {/* </div> */}
            {/* </header> */}
        </div>
        <Footer style={{ background: "#000406", color: "#5f8497", textAlign: 'center', position: "absolute", boxSizing: "border-box", bottom: "0", width: "100%", fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </div>
    )
}
