import React, { useState, useEffect } from 'react'
import { Form, Select, DatePicker, Button, Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import Navbar from '../components/Navbar';
import { getAuthToken } from '../utils';

export default function Addencodetask() {
    const history = useHistory();
    const [ files, setFiles ] = useState([]);
    const [ codeSystem, setCodeSystem ] = useState([]);
    const url = 'http://localhost:8080/';
    console.log(files)
    console.log(typeof(files))

    useEffect(() => {
        getAllFiles();
        getAllCodeSystems();
    }, []);

    const getAllFiles = () => {
        const userId = getAuthToken();
        axios.get(`${url}code/allEncodeTask/${userId}`)
        .then((res) => {
            setFiles(res.data);
        })
        .catch(error => console.error(`Error: ${error}`));
    }

    const getAllCodeSystems = () => {
        const userId = getAuthToken();
        axios.get(`${url}code/codeSystem/${userId}`)
        .then((res) => {
            console.log(res.data)
            setCodeSystem(res.data);
        })
    }

    const handleAddCodeTask = fields => {
        const userId = getAuthToken();
        const { codeSysId, fileId, startTime, endTime } = fields;
        const data = new FormData();
        data.append('userId', userId);
        data.append('codeSysId', JSON.stringify(codeSysId._id));
        data.append('fileId', JSON.stringify(fileId._id));
        data.append('startTime', startTime);
        data.append('endTime', endTime);
    }

    return (
    <div className='App'>
        <Navbar/>
        <div className='App-header'>
            <Form onFinish={handleAddCodeTask}>
                <Form.Item
                    name="fileId"
                    // label='選擇編碼檔案'
                    style={{
                        borderBottomStyle: "solid",
                        borderColor: "#af7c20",
                        height: "75px",
                        color: "#EEE",
                        lineHeight: "75px",
                        padding: "0px 20px"
                    }}
                    size="large"
                    bordered={false}
                >
                    <Select
                        defaultValue={files}
                        showSearch
                        placeholder="選擇編碼檔案"
                        bordered={false}
                    >
                        {files.map((item, index) => (
                            <Select.Option key={JSON.stringify(index)} value={JSON.stringify(item)}>{item.fileDetails[0].fileName}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="codeSysId"
                    // label='選擇編碼架構'
                    style={{
                        borderBottomStyle: "solid",
                        borderColor: "#af7c20",
                        height: "75px",
                        color: "#EEE",
                        lineHeight: "75px",
                        padding: "0px 20px"
                    }}
                    size="large"
                    bordered={false}
                >
                    <Select 
                        bordered={false}
                        placeholder="選擇編碼架構"
                    >
                        {codeSystem.map((item, index) => (
                            <Select.Option key={JSON.stringify(index)} value={JSON.stringify(item)}>{item.codeName}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="startTime"
                    label='開始時間'
                    style={{
                        borderBottomStyle: "solid",
                        borderColor: "#af7c20",
                        height: "75px",
                        color: "#EEE",
                        lineHeight: "75px",
                        padding: "0px 20px"
                    }}
                    size="large"
                    bordered={false}
                >
                    <DatePicker bordered={false}/>
                </Form.Item>
                <Form.Item
                    name="endTime"
                    label='結束時間'
                    style={{
                        borderBottomStyle: "solid",
                        borderColor: "#af7c20",
                        height: "75px",
                        color: "#EEE",
                        lineHeight: "75px",
                        padding: "0px 20px"
                    }}
                    size="large"
                    bordered={false}
                >
                    <DatePicker bordered={false}/>
                </Form.Item>
                <Row justify='center'>
                    <Col>
                        <Form.Item>
                            <Button block className="cancel-form-button" onClick={() => { history.push("/codepage") }}>
                                Cancel
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col push={1}>
                        <Form.Item>
                            <Button block type='primary' htmlType='submit' className="btn">
                                Upload
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    </div>
  )
}
