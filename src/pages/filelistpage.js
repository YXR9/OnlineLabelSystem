import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { Table, Row, Col, Button, Divider } from 'antd';

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
        axios.get(`${url}file/allFile/61cd8404c5f3234a331e3ac4`)
        .then((res) => {
            // const allDatas = res.data.datas.allDatas;
            // add data to state
            setDatas(res.data);
        })
        .catch(error => console.error(`Error: ${error}`));
    }

    return (
      <div className='App'>
          <header className='App-header'>
              <div style={{ margin: '30px' }}>
                 <Row>
                    <Divider orientation='left'>檔案總管</Divider>
                    <Col span={24}>
                        <Table columns={columns} dataSource={datas} pagination={{ pageSize: 5 }} scroll={{ y: 250 }} style={{ tableLayout: "fixed"}}/>
                        <Button className='add' onClick={()=>{ history.push('/uploadpage')}}>add</Button>
                    </Col>
                </Row> 
              </div>
          </header>
      </div>
    )
}
