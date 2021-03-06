import React, { useState, useEffect } from 'react'
import { Form, Select, DatePicker, Button, Row, Col, message, PageHeader } from 'antd';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import Navbar from '../components/Navbar';
import { getAuthToken } from '../utils';

export default function Addencodetask() {
    const history = useHistory();
    const [ files, setFiles ] = useState([]);
    const [ codeSystem, setCodeSystem ] = useState([]);
    const url = 'http://localhost:8080/';

    useEffect(() => {
        getAllFiles();
        getAllCodeSystems();
    }, []);

    const getAllFiles = () => {
        const userId = getAuthToken();
        axios.get(`${url}file/allFile/${userId}`)
        .then((res) => {
            // alert(JSON.stringify(res))
            setFiles(res.data);
        })
        .catch(error => console.error(`Error: ${error}`));
    }

    const getAllCodeSystems = () => {
        const userId = getAuthToken();
        axios.get(`${url}code/codeSystem/${userId}`)
        .then((res) => {
            setCodeSystem(res.data);
        })
    }

    const handleAddCodeTask = (fields) => {
        const userId = getAuthToken();
        const status = 1;
        const creator = true;
        const { codeSysId, fileId, startTime, endTime } = fields;
        const data = new FormData();
        data.append('userId', userId);
        data.append('codeSysId', codeSysId);
        data.append('fileId', fileId);
        data.append('startTime',startTime);
        data.append('endTime', endTime);
        data.append('status', status);
        data.append('creator', creator);
        // data.append('startTime', new Date(Date.parse(startTime)).toLocaleDateString());
        // data.append('endTime', new Date(Date.parse(endTime)).toLocaleDateString());

        console.log("fileId", fileId);
        console.log("codeSysId", codeSysId);
        console.log("startTime", typeof(new Date(Date.parse(startTime)).toLocaleDateString()));
        console.log("endTime", endTime._d);
        
        // console.log(userId, codeSysId, fileId._id, startTime._d, endTime._d);
        axios.post("http://localhost:8080/code/encodeTask", data)
            .then((data) => {
                history.push("/codepage")
                message.success("????????????????????????????");
                console.log(data)
            }).catch (error => {
                message.error(error.message);
            })
    }

    return (
    <div className='App'>
        <Navbar/>
        <div style={{ width: "1800px", margin: "0px auto", padding: "20px"}}>
            <PageHeader title="??????????????????"/>
        <div className='App-header'>
            <Form name="file-upload-form" onFinish={handleAddCodeTask}>
                <Form.Item
                    name="fileId"
                    // label='??????????????????'
                    style={{
                        borderBottomStyle: "solid",
                        borderColor: "#39d8eb",
                        height: "75px",
                        color: "#EEE",
                        lineHeight: "75px",
                        padding: "0px 20px"
                    }}
                    size="large"
                >
                    <Select
                        name="fileId"
                        filterOption={(inputValue, file) =>
                            file.props.children
                                .toString()
                                .toLowerCase()
                                .includes(inputValue.toLowerCase())
                        }
                        showSearch
                        allowClear
                        placeholder="??????????????????"
                        bordered={false}
                    >
                        {files.map((item, index) => (
                            <Select.Option key={JSON.stringify(index)} value={item._id}>{item.fileName}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="codeSysId"
                    // label='??????????????????'
                    style={{
                        borderBottomStyle: "solid",
                        borderColor: "#39d8eb",
                        height: "75px",
                        color: "#EEE",
                        lineHeight: "75px",
                        padding: "0px 20px"
                    }}
                    size="large"
                >
                    <Select
                        name="codeSysId" 
                        bordered={false}
                        placeholder="??????????????????"
                        filterOption={(inputValue, codeSystem) =>
                            codeSystem.props.children
                                .toString()
                                .toLowerCase()
                                .includes(inputValue.toLowerCase())
                        }
                        showSearch
                        allowClear
                    >
                        {codeSystem.map((item, index) => (
                            <Select.Option key={JSON.stringify(index)} value={item._id}>{item.codeName}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="startTime"
                    label='????????????'
                    style={{
                        borderBottomStyle: "solid",
                        borderColor: "#39d8eb",
                        height: "75px",
                        color: "#EEE",
                        lineHeight: "75px",
                        padding: "0px 20px"
                    }}
                    size="large"
                >
                    <DatePicker
                        name="startTime" 
                        bordered={false}
                        
                    />
                </Form.Item>
                <Form.Item
                    name="endTime"
                    label='????????????'
                    style={{
                        borderBottomStyle: "solid",
                        borderColor: "#39d8eb",
                        height: "75px",
                        color: "#EEE",
                        lineHeight: "75px",
                        padding: "0px 20px"
                    }}
                    size="large"
                >
                    <DatePicker
                        name="endTime"
                        bordered={false}
                        value
                    />
                </Form.Item>
                <Row justify='center'>
                    <Col>
                        <Form.Item>
                            <Button block className="btn1" onClick={() => { history.push("/codepage") }}>
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
    </div>
  )
}
