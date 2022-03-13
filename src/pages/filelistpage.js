import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { Table, Row, Col, Button, Divider, Layout } from 'antd';
import Navbar from '../components/Navbar';
import { getAuthToken } from '../utils';
const { Footer } = Layout;

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
          <header className='App-header'>
              <div style={{ width: "1500px" }}>
                 {/* <Row> */}
                    <Divider orientation='left'>檔案總管</Divider>
                    {/* <Col span={40}> */}
                        <Table columns={columns} dataSource={datas} pagination={{ pageSize: 5 }}/>
                        <Button className='add' onClick={()=>{ history.push('/uploadpage')}}>add</Button>
                    {/* </Col>
                </Row>  */}
              </div>
          </header>
          <Footer style={{ background: "url(http://1.bp.blogspot.com/-YODKGVfWimA/VaXaz68qdRI/AAAAAAAAMFA/MZZGV1lGxd4/s1600/yellow-bg-100.jpg) #f2f0ec", color: "#4b4741", textAlign: 'center', position: "absolute", boxSizing: "border-box", bottom: "0", width: "100%", fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </div>
    )
}
