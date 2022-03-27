import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { Table, Button, Layout, PageHeader } from 'antd';
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
        <div style={{ width: "90%", margin: "0px auto", padding: "20px"}}>
          <PageHeader title="資料總管"/>
          <header className='App-header'>
              <div style={{ width: "100%" }}>
                    <Table className='table' columns={columns} dataSource={datas} pagination={{ pageSize: 5 }}/>
              </div>
          </header>
            <Button className='add' onClick={()=>{ history.push('/uploadpage')}} Button style={{ fontFamily: "Comic Sans MS", fontSize: "50px", margin: "-20px 0px 0px 0px", textAlign: "center",padding: "0px 0px 6px 0px", float: "right", borderRadius: "50%", width: "70px", height: "70px", boxShadow: "1px 3px 5px 0px black", lineHeight: "0px", border: "0px", background: "#ae7b20", color: "#f8f7f5"}} >+</Button>
          </div>
          <Footer style={{ background: "url(http://1.bp.blogspot.com/-YODKGVfWimA/VaXaz68qdRI/AAAAAAAAMFA/MZZGV1lGxd4/s1600/yellow-bg-100.jpg) #f2f0ec", color: "#af7c20", textAlign: 'center', position: "absolute", boxSizing: "border-box", bottom: "0", width: "100%", fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </div>
    )
}
